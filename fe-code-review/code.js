/*
GENERAL COMMENTS
- please don'u use "magic numbers" or "magic strings", maybe could be better to use enum of have it from configuration
- this code should be splitted into small pieces (functions, methods, classes or objects - it depends on the architecture, but definitely this code is too long), fo example: by functionality (handle emil, handle hash etc.)
- all names, ids, role names etc should be given from (for example) injected configuration, not hardcoded here (project name, file name etc.)
- it would be great to use some kind of repository (repo) to make operations with database
- too many debug logs (and with no description about the place of existed)
- there isn't handling for errors in all places, we should add it if missing
-
*/

app.post('/api/extract', upload.single('file'), async (req, res) => {
    logInfo('POST /api/extract',req.body);
    logInfo('FILE=',req.file);

    if (req.body) {
        const file = req.file;
        const requestID = req.body.requestID; // maybe it could be better
        const project = req.body.project; // here to use this syntax
        const idUser = req.body.userID; // const {requestID, project, idUser} =  req.body;
        const user = await User.findOne(idUser);

        if (requestID && project && idUser && user) {
            logDebug('User with role '+user.role, user);
            if (user.role === 'ADVISOR' || user.role.indexOf('ADVISOR') > -1)
                return res.json({requestID, step: 999, status: 'DONE', message: 'Nothing to do for ADVISOR role'});

            /* reset status variables */
            await db.updateStatus(requestID, 1, '');

            logDebug('CONFIG:', config.projects);
            if (project === 'inkasso' && config.projects.hasOwnProperty(project) && file) {
                const hashSum = crypto.createHash('sha256'); //it's unused value, remove it
                const fileHash = idUser;
                const fileName = 'fullmakt';
                const fileType = mime.getExtension(file.mimetype);
                if (fileType !== 'pdf')
                    return res.status(500).json({requestID, message: 'Missing pdf file'});
                await db.updateStatus(requestID, 3, '');

                const folder = `${project}-signed/${idUser}`;
                logDebug('FILE2=', file);
                await uploadToGCSExact(folder, fileHash, fileName, fileType, file.mimetype, file.buffer);
                await db.updateStatus(requestID, 4, '');
                const ret = await db.updateUploadedDocs(idUser, requestID, fileName, fileType, file.buffer);
                logDebug('DB UPLOAD:', ret);

                await db.updateStatus(requestID, 5, '');

                let sent = true; //it's unused value, remove it
                const debtCollectors = await db.getDebtCollectors();
                logDebug('debtCollectors=', debtCollectors);
                if (!debtCollectors)
                    return res.status(500).json({requestID, message: 'Failed to get debt collectors'});

                if (!!(await db.hasUserRequestKey(idUser))) { //FIX: check age, not only if there's a request or not '//remove comments
                    return res.json({requestID, step: 999, status: 'DONE', message: 'Emails already sent'});
                }

                const sentStatus = {};
                for (let i = 0; i < debtCollectors.length ; i++) {
                    await db.updateStatus(requestID, 10+i, '');
                    const idCollector = debtCollectors[i].id; //these
                    const collectorName = debtCollectors[i].name; //three lines
                    const collectorEmail = debtCollectors[i].email; // could be use as one, for example const collector = debtCollectors[i] and then collector.<field>
                    const hashSum = crypto.createHash('sha256');
                    const hashInput = `${idUser}-${idCollector}-${(new Date()).toISOString()}`;
                    logDebug('hashInput=', hashInput);
                    hashSum.update(hashInput);
                    const requestKey = hashSum.digest('hex');
                    logDebug('REQUEST KEY:', requestKey);

                    const hash = Buffer.from(`${idUser}__${idCollector}`, 'utf8').toString('base64')

                    if (!!(await db.setUserRequestKey(requestKey, idUser))
                        && !!(await db.setUserCollectorRequestKey(requestKey, idUser, idCollector))) {

                        /* prepare email */ //if we need comment, we need a separate function/method/object/module instead
                        const sendConfig = {
                            sender: config.projects[project].email.sender,
                            replyTo: config.projects[project].email.replyTo, //in line below we need a ' to close string
                            subject: 'Email subject,
                            templateId: config.projects[project].email.template.collector,
                            params: {
                                downloadUrl: `https://url.go/download?requestKey=${requestKey}&hash=${hash}`, //don't
                                uploadUrl: `https://url.go/upload?requestKey=${requestKey}&hash=${hash}`, //use hardcoded value
                                confirmUrl: `https://url.go/confirm?requestKey=${requestKey}&hash=${hash}` //the basic values should come from config
                            },
                            tags: ['request'],
                            to: [{ email: collectorEmail , name: collectorName }],
                        };
                        logDebug('Send config:', sendConfig);

                        try {
                            await db.setEmailLog({collectorEmail, idCollector, idUser, requestKey})
                        } catch (e) {
                            logDebug('extract() setEmailLog error=', e); //maybe not only debug, but return a status code?
                        }

                        /* send email */ //if we need comment, we need a separate function/method/object/module instead
                        const resp = await email.send(sendConfig, config.projects[project].email.apiKey);
                        logDebug('extract() resp=', resp);

                        // update DB with result //if we need comment, we need a separate function/method/object/module instead
                        await db.setUserCollectorRequestKeyRes(requestKey, idUser, idCollector, resp);

                        if (!sentStatus[collectorName]) //if we use {} with other ifs, use it here too
                            sentStatus[collectorName] = {};
                        sentStatus[collectorName][collectorEmail] = resp;

                        if (!resp) {
                            logError('extract() Sending email failed: ', resp);
                        }
                    }
                }
                await db.updateStatus(requestID, 100, ''); //Better is to use some kind of enum instead of pure numbers

                logDebug('FINAL SENT STATUS:');
                console.dir(sentStatus, {depth: null}); //we have logDebug, why console?

                // remove unused code instead of comment
                //if (!allSent)
                //return res.status(500).json({requestID, message: 'Failed sending email'});

                await db.updateStatus(requestID, 500, '');

                /* prepare summary email */
                const summaryConfig = {
                    // remove unused code instead of comment
                    //bcc: [{ email: 'tomas@inkassoregisteret.com', name: 'Tomas' }],
                    sender: config.projects[project].email.sender,
                    replyTo: config.projects[project].email.replyTo,
                    subject: 'Oppsummering Kravsforespørsel',
                    templateId: config.projects[project].email.template.summary,
                    params: {
                        collectors: sentStatus,
                    },
                    tags: ['summary'],
                    //remove comment below and see general comments
                    to: [{ email: 'tomas@upscore.no' , name: 'Tomas' }], // FIXXX: config.projects[project].email.sender
                };
                logDebug('Summary config:', summaryConfig);

                 // remove unused code instead of comment
                /* send email */
                //const respSummary = await email.send(sendConfig, config.projects[project].email.apiKey);
                //logDebug('extract() summary resp=', respSummary);

                await db.updateStatus(requestID, 900, '');
            }
            await db.updateStatus(requestID, 999, '');
            return res.json({requestID, step: 999, status: 'DONE', message: 'Done sending emails...'});
        } else
            return res.status(500).json({requestID, message: 'Missing requried input (requestID, project, file)'});
    }
    res.status(500).json({requestID: '', message: 'Missing requried input (form data)'});
});

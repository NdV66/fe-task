export const enENTranslate = {
  appName: 'My chart',

  chartForm: {
    title: 'You can define your ranges below',
    quartersRangeFrom: 'From year',
    quartersRangeTo: 'To year',
    selectQuarter: 'Select quarter',
    houseType: 'House type',
    submit: 'Submit',
    quarters: [
      { label: 'K1', value: '1' },
      { label: 'K2', value: '2' },
      { label: 'K3', value: '3' },
      { label: 'K4', value: '4' },
    ],
    houseTypes: [
      { label: 'Boliger i alt', value: '00' },
      { label: 'Småhus', value: '02' },
      { label: 'Blokkleiligheter', value: '03' },
    ],

    errors: {
      yearMustBeGreater: 'Start date must be greater than 2009',
      yearMustBeBefore: 'Stop date must be max a current year',
      required: 'This field cannot be empty',
      numberOnly: 'This field should contain number',
      yearToOlderThanYearFrom: 'This year should be greater than the start one',
      generic: 'We have errors. Check your inputs.',
    },
  },

  chartComment: {
    title: 'Maybe something to add?',
    comment: 'Comment',
    save: 'Save',
    remove: 'Remove',
    description:
      'Warning! The comment is per chart setting, so with every unique chart settings to have an unique comment.',
  },

  errors: {
    empty: 'This field cannot be empty.',
    wrongType: 'This type is wrong.',
  },
};

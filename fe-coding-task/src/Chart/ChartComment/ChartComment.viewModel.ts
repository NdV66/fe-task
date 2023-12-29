import { useSelector } from 'react-redux';
import { RootState } from '../../appStore';
import { IChartCommentService, TChartCommentForm, getChartCommentFormSchema } from './ChartComment.types';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

export const useChartComment = (service: IChartCommentService) => {
  const { translations } = useSelector((state: RootState) => state.languages);
  const { formData } = useSelector((state: RootState) => state.chartForm);
  const form = useForm<TChartCommentForm>({
    resolver: yupResolver(getChartCommentFormSchema()),
    defaultValues: {
      comment: '',
    },
  });
  const commentValue = useWatch({ name: 'comment', control: form.control });

  const onSubmit = (data: TChartCommentForm) => formData && service.save(data, formData);

  const onRemove = () => {
    if (formData) {
      form.resetField('comment');
      service.remove(formData);
    }
  };

  useEffect(() => {
    if (formData) {
      const comment = service.read(formData);
      comment ? form.setValue('comment', comment, { shouldTouch: false }) : form.resetField('comment');
    }
  }, [formData, service, form]);

  return {
    translations,
    form,
    onSubmit,
    onRemove,
    commentValue,
  };
};

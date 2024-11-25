import Input from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import Card from '@/components/common/card';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { priceGroupValidationSchema } from './price-group-validation-schema';
import { PriceGroup } from '@/types';
import { getErrorMessage } from '@/utils/form-error';
import { Config } from '@/config';
import { useSettingsQuery } from '@/data/settings';
import StickyFooterPanel from '@/components/ui/sticky-footer-panel';
import {
  useCreatePriceGroupMutation,
  useUpdatePriceGroupMutation,
} from '@/data/price-group';

type FormValues = {
  naziv: string;
};

type IProps = {
  initialValues?: PriceGroup;
};

const defaultValues = {
  naziv: '',
};

export default function PriceGroupCreateOrUpdateForm({
  initialValues,
}: IProps) {
  const router = useRouter();
  const { locale } = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialValues
      ? {
          ...initialValues,
        }
      : defaultValues,
    //@ts-ignore
    resolver: yupResolver(priceGroupValidationSchema),
  });
  const { mutate: createPriceGroup, isLoading: creating } =
    useCreatePriceGroupMutation();
  const { mutate: updatePriceGroup, isLoading: updating } =
    useUpdatePriceGroupMutation();

  const {
    // @ts-ignore
    settings: { options },
  } = useSettingsQuery({
    language: locale!,
  });

  const isTranslateCoupon = router.locale !== Config.defaultLanguage;

  const onSubmit = async (values: FormValues) => {
    const input = {
      language: router.locale,
      naziv: values.naziv,
    };
    try {
      if (!initialValues) {
        createPriceGroup({
          ...input,
        });
      } else {
        updatePriceGroup({
          ...input,
          id: initialValues.id,
        });
      }
    } catch (error) {
      const serverErrors = getErrorMessage(error);
      Object.keys(serverErrors?.validation).forEach((field: any) => {
        setError(field.split('.')[1], {
          type: 'manual',
          message: serverErrors?.validation[field][0],
        });
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Card className="w-full">
            <Input
              label="Name"
              {...register('naziv')}
              error={t(errors.naziv?.message!)}
              variant="outline"
              className="mb-5"
              disabled={isTranslateCoupon}
            />
        </Card>
      </div>
      <StickyFooterPanel className="z-0">
        <div className="text-end">
          {initialValues && (
            <Button
              variant="outline"
              onClick={router.back}
              className="me-4"
              type="button"
            >
              {t('form:button-label-back')}
            </Button>
          )}

          <Button
            loading={creating || updating}
            disabled={creating || updating}
          >
            {initialValues ? 'Update Price Group' : 'Create Price Group'}
          </Button>
        </div>
      </StickyFooterPanel>
    </form>
  );
}

import Input from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import DatePicker from '@/components/ui/date-picker';
import Button from '@/components/ui/button';
import TextArea from '@/components/ui/text-area';
import Card from '@/components/common/card';
import Label from '@/components/ui/label';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { chefValidationSchema } from './chef-validation-schema';
import {
  Chef,
  ChefLocation,
  KorisnickiNalog,
} from '@/types';
import { getErrorMessage } from '@/utils/form-error';
import { Config } from '@/config';
import { useSettingsQuery } from '@/data/settings';
import StickyFooterPanel from '@/components/ui/sticky-footer-panel';
import {
  useCreateChefMutation,
  useLocationsQuery,
  useUpdateChefMutation,
} from '@/data/chef';
import SelectInput from '../ui/select-input';
import PasswordInput from '../ui/password-input';

type FormValues = {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  dob: string;
  phone_number: string;
  ssn: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  company_name: string;
  company_email: string;
  company_phone: string;
  company_ein: string;
  company_address: string;
  company_city: string;
  company_state: string;
  company_zip_code: string;
  emergency_contact: string;
  chefLocations: any;
  role: string;
  license_due: string;
  korisnickiNalog: KorisnickiNalog;
  korisnicko_ime: string;
  password: string;
  passwordConfirmation: string;
  note: string;
};

const roles = [
  { name: 'admin', value: 1 },
  { name: 'manager', value: 2 },
];

type IProps = {
  initialValues?: Chef;
};
export default function ChefCreateOrUpdateForm({ initialValues }: IProps) {
  const router = useRouter();
  const { locale } = useRouter();
  const { t } = useTranslation();
  const { locations, loading } = useLocationsQuery();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
          korisnicko_ime:initialValues?.korisnickiNalog?.korisnicko_ime,
          role: initialValues?.korisnickiNalog?.sif_uloga_id
            ? roles?.find(
                (role) =>
                  role.value == initialValues?.korisnickiNalog?.sif_uloga_id!,
              )
            : { name: '', value: '' },
          chefLocations: initialValues?.chefLocations
            ? initialValues?.chefLocations?.map((e: ChefLocation) => e.location)
            : [],
        }
      : {
        role:roles?.find((role) => role.name == "manager")
      },
    //@ts-ignore
    resolver: initialValues?null:yupResolver(chefValidationSchema),
  });
  const { mutate: createChef, isLoading: creating } = useCreateChefMutation();
  const { mutate: updateChef, isLoading: updating } = useUpdateChefMutation();

  const {
    // @ts-ignore
    settings: { options },
  } = useSettingsQuery({
    language: locale!,
  });

  const [dob, license_due] = watch(['dob', 'license_due']);

  const isTranslateCoupon = router.locale !== Config.defaultLanguage;

  const onSubmit = async (values: FormValues) => {
    const input = {
      language: router.locale,
      first_name: values.first_name,
      middle_name: values.middle_name,
      last_name: values.last_name,
      email: values.email,
      dob: values.dob,
      phone_number: values.phone_number,
      ssn: values.ssn,
      address: values.address,
      city: values.city,
      state: values.state,
      zip_code: values.zip_code,
      company_name: values.company_name,
      company_email: values.company_email,
      company_phone: values.company_phone,
      company_ein: values.company_ein,
      company_address: values.company_address,
      company_city: values.company_city,
      company_state: values.company_state,
      company_zip_code: values.company_zip_code,
      emergency_contact: values.emergency_contact,
      chefLocations: values.chefLocations,
      role: values.role,
      license_due: values.license_due,
      korisnicko_ime: values.korisnicko_ime,
      password: values.password,
      passwordConfirmation: values.passwordConfirmation,
      note: values.note,
    };
    console.log('initialValues=>', initialValues);
    try {
      if (!initialValues) {
        createChef({
          ...input,
        });
      } else {
        updateChef({
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
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="First name"
                {...register('first_name')}
                error={t(errors.first_name?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Input
                label="Middle name"
                {...register('middle_name')}
                error={t(errors.middle_name?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Last name"
                {...register('last_name')}
                error={t(errors.last_name?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Input
                label="E-mail"
                {...register('email')}
                error={t(errors.email?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <DatePicker
                control={control}
                name="dob"
                dateFormat="dd/MM/yyyy"
                startDate={new Date(dob)}
                label="Chef DOB"
                className="border border-border-base"
                error={t(errors.dob?.message!)}
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Input
                label="Phone number"
                {...register('phone_number')}
                error={t(errors.phone_number?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Ssn"
                {...register('ssn')}
                error={t(errors.ssn?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Input
                label="Address"
                {...register('address')}
                error={t(errors.address?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/3 sm:pe-2">
              <Input
                label="City"
                {...register('city')}
                error={t(errors.city?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
            <div className="w-full p-0 sm:w-1/3 sm:ps-2">
              <Input
                label="State"
                {...register('state')}
                error={t(errors.state?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
            <div className="w-full p-0 sm:w-1/3 sm:ps-2">
              <Input
                label="Zip code"
                {...register('zip_code')}
                error={t(errors.zip_code?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Company name"
                {...register('company_name')}
                error={t(errors.company_name?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Input
                label="Company e-mail"
                {...register('company_email')}
                error={t(errors.company_email?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Company phone"
                {...register('company_phone')}
                error={t(errors.company_phone?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Input
                label="Ein"
                {...register('company_ein')}
                error={t(errors.company_ein?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Company address"
                {...register('company_address')}
                error={t(errors.company_address?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Input
                label="Company city"
                {...register('company_city')}
                error={t(errors.company_city?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Company state"
                {...register('company_state')}
                error={t(errors.company_state?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Input
                label="Company zip code"
                {...register('company_zip_code')}
                error={t(errors.company_zip_code?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Input
                label="Emergency contact"
                {...register('emergency_contact')}
                error={t(errors.emergency_contact?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Label>Store Location</Label>
              <SelectInput
                name="chefLocations"
                control={control}
                options={locations!}
                getOptionLabel={(option: any) => option.location_name}
                getOptionValue={(option: any) => option.id}
                isClearable={true}
                isLoading={loading}
                isMulti
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Label>User role</Label>
              <SelectInput
                {...register('role')}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.value}
                control={control}
                options={roles}
              />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <DatePicker
                control={control}
                name="license_due"
                dateFormat="dd/MM/yyyy"
                startDate={new Date(license_due)}
                label="License due"
                className="border border-border-base"
                error={t(errors.license_due?.message!)}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-0 mb-5 sm:mb-0 sm:w-1/3 sm:pe-2">
              <Input
                label="Username"
                {...register('korisnicko_ime')}
                error={t(errors.korisnicko_ime?.message!)}
                variant="outline"
                className="mb-5"
                disabled={isTranslateCoupon}
              />
            </div>
            <div className="w-full p-0 sm:w-1/3 sm:ps-2">
              <PasswordInput
                label="Create password"
                {...register('password')}
                variant="outline"
                error={t(errors.password?.message!)}
              />
            </div>
            <div className="w-full p-0 sm:w-1/3 sm:ps-2">
              <PasswordInput
                label="Repeat password"
                {...register('passwordConfirmation')}
                variant="outline"
                error={t(errors.passwordConfirmation?.message!)}
              />
            </div>
          </div>
          <div className="relative">
            <TextArea
              label={t('form:input-label-description')}
              {...register('note')}
              variant="outline"
              className="mb-5"
            />
          </div>
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
            {initialValues ? 'Update Chef' : 'Create Chef'}
          </Button>
        </div>
      </StickyFooterPanel>
    </form>
  );
}

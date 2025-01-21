import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import { useTranslation } from 'next-i18next';
import * as yup from 'yup';
import Link from '@/components/ui/link';
import Form from '@/components/ui/forms/form';
import { Routes } from '@/config/routes';
import { useLogin } from '@/data/user';
import type { LoginInput } from '@/types';
import { useState } from 'react';
import Alert from '@/components/ui/alert';
import Router from 'next/router';
import {
  allowedRoles,
  hasAccess,
  setAuthCredentials,
} from '@/utils/auth-utils';

const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('form:error-email-format')
    .required('form:error-email-required'),
  password: yup.string().required('form:error-password-required'),
});

const defaultValues = {
  email: 'admin@demo.com',
  password: 'demodemo',
};

const LoginForm = () => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: login, isLoading, error } = useLogin();

  function onSubmit({ name, password }: LoginInput) {
    login(
      {
        name,
        password,
      },
      {
        onSuccess: (data) => {
          if (data?.token) {
            if (hasAccess(allowedRoles, data?.permissions)) {
              setAuthCredentials(data?.token, data?.permissions, data?.role);
              Router.push(Routes.dashboard);
              return;
            }
            setErrorMessage('form:error-enough-permission');
          } else {
            setErrorMessage('form:error-credential-wrong');
          }
        },
        onError: (error) => {setErrorMessage('form:error-credential-wrong');},
      }
    );
  }

  return (
    <>
      <Form<LoginInput> validationSchema={loginFormSchema} onSubmit={onSubmit} useFormProps={{ defaultValues }}>
        {({ register, formState: { errors } }) => (
          <>
            <Input
              label={t('form:input-label-name')}
              {...register('name')}
              type="name"
              variant="outline"
              className="mb-4"
              error={t(errors?.name?.message!)}
            />
            <PasswordInput
              label={t('form:input-label-password')}
              forgotPassHelpText={t('form:input-forgot-password-label')}
              {...register('password')}
              error={t(errors?.password?.message!)}
              variant="outline"
              className="mb-4"
            />
            <Button className="w-full" loading={isLoading} disabled={isLoading}>
              {t('form:button-label-login')}
            </Button>
          </>
        )}
      </Form>
      {errorMessage ? (
        <Alert
          message={t(errorMessage)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
    </>
  );
};

export default LoginForm;

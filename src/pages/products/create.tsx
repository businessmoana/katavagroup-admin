import Layout from '@/components/layouts/admin';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProductCreateOrUpdateForm from '@/components/product/product-form';
import { adminOnly } from '@/utils/auth-utils';

export default function CreateProductPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          Create Product
        </h1>
      </div>
      <ProductCreateOrUpdateForm />
    </>
  );
}
CreateProductPage.authenticate = {
  permissions: adminOnly,
};
CreateProductPage.Layout = Layout;
export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});

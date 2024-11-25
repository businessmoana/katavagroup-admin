import Layout from '@/components/layouts/admin';
import ChefCreateOrUpdateForm from '@/components/chef/chef-form';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Config } from '@/config';
import { useChefQuery } from '@/data/chef';
import { useRouter } from 'next/router';
import ProductCreateOrUpdateForm from '@/components/product/product-form';
import { productClient } from '@/data/client/product';
import { useEffect, useState } from 'react';
import { adminOnly } from '@/utils/auth-utils';

export default function UpdateProductPage() {
  const { query, locale } = useRouter();
  const { t } = useTranslation();
  const [initialData, setInitialData] = useState();

  useEffect(() => {
    getProduct(Number(query.productId));
  }, [query.productId]);

  const getProduct = async (productId:number) => {
    const result = await productClient.getProduct(productId);
    setInitialData(result.productDetail);
  } 
  return (
    <>
      <div className="flex pb-5 border-b border-dashed border-border-base md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          Edit Product
        </h1>
      </div>
      {initialData&&<ProductCreateOrUpdateForm initialValues={initialData} />}
    </>
  );
}
UpdateProductPage.authenticate = {
    permissions: adminOnly,
  };
  UpdateProductPage.Layout = Layout;
export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});

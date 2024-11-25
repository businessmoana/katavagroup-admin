import {
  Product,
  CreateProduct,
  ProductPaginator,
  QueryOptions,
  GetParams,
  ProductQueryOptions,
  GenerateDescriptionInput,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { crudFactory } from './curd-factory';
import { HttpClient } from './http-client';
import { frameData } from 'framer-motion';

export const productClient = {
  ...crudFactory<Product, QueryOptions, CreateProduct>(API_ENDPOINTS.PRODUCTS),
  paginated: ({ ...params }: Partial<any>) => {
    return HttpClient.get<any>(API_ENDPOINTS.PRODUCTS, {
      ...params,
    });
  },
  getProduct(id:number) {
    return HttpClient.get<any>(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  },

  deactivateProductItem({ itemId }: Partial<any> & { itemId: number }) {
    return HttpClient.put<any>(`${API_ENDPOINTS.PRODUCTS}/deactive-product-item/${itemId}`, []);
  },
  createOrUpdateProductItem({ data }: Partial<any> & { data: any }) {
    return HttpClient.post<any>(`${API_ENDPOINTS.PRODUCTS}/product-item`, data);
  },
  changeProductStatus(data: any) {
    return HttpClient.post<any>(`${API_ENDPOINTS.PRODUCTS}/status`, data);
  },
  createOrUpdateProduct({ data }: { data: any }) {
    let formData = new FormData();
    Object.keys(data).map((key: any) => {
      formData.append(key, data[key]);
    });
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return HttpClient.post<any>(
      `${API_ENDPOINTS.PRODUCTS}`,
      formData,
      options
    );
  },

  removeProductImage(productId:any, imageName:any) {
    return HttpClient.put<any>(`${API_ENDPOINTS.PRODUCTS}/remove-image/${productId}`, [imageName]);
  },

  duplicateProduct(productId: any) {
    return HttpClient.put<any>(`${API_ENDPOINTS.PRODUCTS}/duplicate-product/${productId}`, []);
  },

  getOrders(startDate:any, endDate:any) {
    return HttpClient.post<any>(`${API_ENDPOINTS.PICKPACK}`,{startDate, endDate});
  },
  
  approveOrder(orderId:any){
    return HttpClient.post<any>(`${API_ENDPOINTS.PICKPACK}/approve-order`,{orderId});
  },

  deleteOrderItem(data:any){
    return HttpClient.post<any>(`${API_ENDPOINTS.PICKPACK}/remove-order-item`,data);
  },

  deleteOrder({orderId}:{orderId:any}){
    return HttpClient.delete<any>(`${API_ENDPOINTS.PICKPACK}/remove-order/${orderId}`);
  },

  savePalletTax(data:any){
    return HttpClient.post<any>(`${API_ENDPOINTS.PICKPACK}/save-pallet-tax`,data);
  },

  getOrderItem(id:any){
    return HttpClient.get<any>(`${API_ENDPOINTS.PICKPACK}/order-item/${id}`);
  },

  updateOrderItem(data:any){
    return HttpClient.post<any>(`${API_ENDPOINTS.PICKPACK}/order-item-update`,data);
  },

  getProductList(){
    return HttpClient.get<any>(`${API_ENDPOINTS.PICKPACK}/product-list`);
  },

  newOrderItem(data:any){
    return HttpClient.post<any>(`${API_ENDPOINTS.PICKPACK}/order-item-add`,data);
  },





  get({ slug, language }: GetParams) {
    return HttpClient.get<Product>(`${API_ENDPOINTS.PRODUCTS}/${slug}`, {
      language,
      with: 'type;shop;categories;tags;variations.attribute.values;variation_options;variation_options.digital_file;author;manufacturer;digital_file',
    });
  },

  popular({ shop_id, ...params }: Partial<ProductQueryOptions>) {
    return HttpClient.get<Product[]>(API_ENDPOINTS.POPULAR_PRODUCTS, {
      searchJoin: 'and',
      with: 'type;shop',
      ...params,
      search: HttpClient.formatSearchParams({ shop_id }),
    });
  },
  lowStock({ shop_id, ...params }: Partial<ProductQueryOptions>) {
    return HttpClient.get<Product[]>(
      API_ENDPOINTS.LOW_STOCK_PRODUCTS_ANALYTICS,
      {
        searchJoin: 'and',
        with: 'type;shop',
        ...params,
        search: HttpClient.formatSearchParams({ shop_id }),
      },
    );
  },
  generateDescription: (data: GenerateDescriptionInput) => {
    return HttpClient.post<any>(API_ENDPOINTS.GENERATE_DESCRIPTION, data);
  },
  newOrInActiveProducts: ({
    user_id,
    shop_id,
    status,
    name,
    ...params
  }: Partial<ProductQueryOptions>) => {
    return HttpClient.get<ProductPaginator>(
      API_ENDPOINTS.NEW_OR_INACTIVE_PRODUCTS,
      {
        searchJoin: 'and',
        user_id,
        shop_id,
        status,
        name,
        ...params,
        search: HttpClient.formatSearchParams({
          status,
          name,
        }),
      },
    );
  },
  lowOrOutOfStockProducts: ({
    user_id,
    shop_id,
    status,
    categories,
    name,
    type,
    ...params
  }: Partial<ProductQueryOptions>) => {
    return HttpClient.get<ProductPaginator>(
      API_ENDPOINTS.LOW_OR_OUT_OF_STOCK_PRODUCTS,
      {
        searchJoin: 'and',
        user_id,
        shop_id,
        status,
        name,
        ...params,
        search: HttpClient.formatSearchParams({
          status,
          name,
          categories,
          type,
        }),
      },
    );
  },
  productByCategory({
    limit,
    language,
  }: {
    limit?: number;
    language?: string;
  }) {
    return HttpClient.get<any>(API_ENDPOINTS.CATEGORY_WISE_PRODUCTS, {
      limit,
      language,
    });
  },
  // productByCategory({ shop_id, ...params }: Partial<ProductQueryOptions>) {
  //   return HttpClient.get<Product[]>(API_ENDPOINTS.CATEGORY_WISE_PRODUCTS, {
  //     searchJoin: 'and',
  //     ...params,
  //     search: HttpClient.formatSearchParams({ shop_id }),
  //   });
  // },
  mostSoldProductByCategory({
    shop_id,
    ...params
  }: Partial<ProductQueryOptions>) {
    return HttpClient.get<Product[]>(
      API_ENDPOINTS.CATEGORY_WISE_PRODUCTS_SALE,
      {
        searchJoin: 'and',
        ...params,
        search: HttpClient.formatSearchParams({ shop_id }),
      },
    );
  },
  getProductsByFlashSale: ({
    user_id,
    shop_id,
    slug,
    name,
    ...params
  }: any) => {
    return HttpClient.get<ProductPaginator>(
      API_ENDPOINTS.PRODUCTS_BY_FLASH_SALE,
      {
        searchJoin: 'and',
        user_id,
        shop_id,
        slug,
        name,
        ...params,
        search: HttpClient.formatSearchParams({
          name,
        }),
      },
    );
  },
  topRated({ shop_id, ...params }: Partial<ProductQueryOptions>) {
    return HttpClient.get<Product[]>(API_ENDPOINTS.TOP_RATED_PRODUCTS, {
      searchJoin: 'and',
      ...params,
      search: HttpClient.formatSearchParams({ shop_id }),
    });
  },
};

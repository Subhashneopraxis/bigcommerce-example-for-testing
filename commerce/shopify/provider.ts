/*
  Forked from https://github.com/vercel/commerce/tree/main/packages/shopify/src
  Changes:
    - Removed authentication, customer and wishlist hooks.
    - Added storeDomain and accessToken parameters.
*/
import { SHOPIFY_CHECKOUT_ID_COOKIE } from './const'
import { handler as useSearch } from './product/use-search'
import { handler as useProduct } from './product/use-product'
import { handler as useCart } from './cart/use-cart'
import { handler as useAddItem } from './cart/use-add-item'
import { handler as useUpdateItem } from './cart/use-update-item'
import { handler as useRemoveItem } from './cart/use-remove-item'
import { handler as useCategories } from './site/use-categories'
import { handler as useBrands } from './site/use-brands'
import { getFetcher } from './fetcher'
import { Fetcher } from '@plasmicpkgs/commerce'

export const getShopifyProvider = (storeDomain: string, accessToken: string) => (
  {
    locale: 'en-us',
    cartCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
    cart: { useCart, useAddItem, useUpdateItem, useRemoveItem },
    fetcher: getFetcher(storeDomain, accessToken),
    products: { useSearch, useProduct },
    site: { useCategories, useBrands }
  }
)

export type ShopifyProvider = {
  locale: string;
  cartCookie: string;
  fetcher: Fetcher;
  cart: {
    useCart: typeof useCart;
    useAddItem: typeof useAddItem;
    useUpdateItem: typeof useUpdateItem;
    useRemoveItem: typeof useRemoveItem
  };
  products: {
    useSearch: typeof useSearch
    useProduct: typeof useProduct
  };
  site: {
    useCategories: typeof useCategories
    useBrands: typeof useBrands
  }
}

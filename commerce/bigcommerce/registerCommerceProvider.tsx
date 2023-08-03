import { GlobalContextMeta } from "@plasmicapp/host";
import registerGlobalContext from "@plasmicapp/host/registerGlobalContext";
import React from "react";
import { Registerable } from "./registerable";
import { getCommerceProvider } from "./bigcommerce";
import { BigCommerceCredentials } from "./provider";

interface CommerceProviderProps {
  children?: React.ReactNode;
  accessToken: string;
  clientName: string;
  clientId: string;
  clientSecret: string;
  channelId: number;
  storeHash: string;
  storeFrontApiToken: string;
}
export const commerceProviderMeta: GlobalContextMeta<CommerceProviderProps> = {
  name: "plasmic-commerce-bigcommerce-provider",
  displayName: "Bigcommerce Provider",
  props: {
    accessToken: {
      type: "string",
      defaultValue: "rxvy03kvd82x8r2cmci1zquoelofcx"
    },
    clientName: {
      type: "string",
      defaultValue: "Plasmic"
    },
    clientId: {
      type: "string",
      defaultValue: "sklxsuit3pijq1cgsacl1713aj9uzjv"
    },
    clientSecret: {
      type: "string",
      defaultValue: "1a8147648a436753d7ac19601e02410797048e897c00034fa9c7d3e939e0749d"
    },
    channelId: {
      type: "number",
      defaultValue: 1
    },
    storeHash: {
      type: "string",
      defaultValue: "5o7xzmxoo0"
    },
    storeFrontApiToken: {
      type: "string",
      defaultValue: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOlsiaHR0cHM6Ly9uZXh0YmFzZS1zYW5kYm94LTMubXliaWdjb21tZXJjZS5jb20iLCJodHRwczovL2NvZGVnZW4ucGxhc21pYy5hcHAiXSwiZWF0IjoxNzg3NzYyOTIzLCJpYXQiOjE2ODc3NzI3OTAsImlzcyI6IkJDIiwic2lkIjoxMDAyOTA2MzY2LCJzdWIiOiJza2x4c3VpdDNwaWpxMWNnc2FjbDE3MTNhajl1emp2Iiwic3ViX3R5cGUiOjIsInRva2VuX3R5cGUiOjF9.LxSQZqRpIcBBjKZCe93qVyuVwZhPvvzX0LAsCLhg_kgKaw7kZO20dpifPyDlmg_Jf9ZXRCJ6Sur08CSq3OUV9Q",
    },
  },
  description: `Get your BigCommerce Credentials from the bigcommerce admin UI under Developer > Settings > API accounts`,
  importPath: "./commerce/bigcommerce/registerCommerceProvider",
  importName: "CommerceProviderComponent",
};

export function CommerceProviderComponent(props: CommerceProviderProps) {
  const { accessToken, clientName, clientId, clientSecret, channelId, storeHash, storeFrontApiToken, children } = props
  const creds: BigCommerceCredentials = { 
    storeFrontApiUrl: `https://store-${storeHash}.mybigcommerce.com/graphql`,
    storeFrontApiToken,
    storeApiUrl: `https://api.bigcommerce.com/stores/${storeHash}`,
    storeApiToken: accessToken,
    storeApiClientId: clientId,
    storeChannelId: channelId,
    storeUrl: `https://store-${storeHash}.mybigcommerce.com`,
    storeHash,
    storeApiClientSecret: clientSecret,
    clientName
  };
  const CommerceProvider = getCommerceProvider(creds);

  return <CommerceProvider>{children}</CommerceProvider>;
}

export function registerCommerceProvider(
  loader?: Registerable,
  customCommerceProviderMeta?: GlobalContextMeta<CommerceProviderProps>
) {
  const doRegisterComponent: typeof registerGlobalContext = (...args) =>
    loader
      ? loader.registerGlobalContext(...args)
      : registerGlobalContext(...args);
  doRegisterComponent(
    CommerceProviderComponent,
    customCommerceProviderMeta ?? commerceProviderMeta
  );
}

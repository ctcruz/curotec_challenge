import Axios, { AxiosError, type AxiosRequestConfig } from "axios";
import api from "../../services/axios";

export const useCustomClient = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = api
    .request({
      ...config,
      cancelToken: source.token,
    })
    .then(({ data }) => data);

  // eslint-disable-next-line
  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled by React Query");
  };

  return promise;
};

export default useCustomClient;

// eslint-disable-next-line
export interface ErrorType<Error> extends AxiosError<Error> {}

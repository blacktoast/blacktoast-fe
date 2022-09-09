import { Dispatch, SetStateAction, useEffect, useState } from 'react';
type inputType = {
  apiFunc: Function;
};

export const useDataFetch = <ArgsType, responseType>({
  apiFunc,
}: inputType): [string, responseType | object, Dispatch<SetStateAction<ArgsType | undefined>>] => {
  const [args, setArgs] = useState<ArgsType>();
  const [status, setStatus] = useState('Loading');
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async (args: ArgsType | undefined) => {
      try {
        if (args) {
          setStatus('Loading');
          const data = await apiFunc({ ...args });
          setData(data);
          setStatus('');
        }
      } catch (error) {
        setStatus('Error');
      }
    };
    getData(args);
  }, [args, apiFunc]);

  return [status, data, setArgs];
};

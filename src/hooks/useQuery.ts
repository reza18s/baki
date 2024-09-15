import { useHistory, useLocation } from 'react-router-dom';

export function useBooleanQuery(name: string): [boolean, (v: boolean) => void] {
  const history = useHistory();
  const value = history.location.search.includes(`${name}=true`) ? true : false;

  const setValue = (newValue: boolean) => {
    if (value !== newValue) {
      if (newValue) {
        const newSearch =
          location.search.length > 1
            ? `${location.search}&${name}=true`
            : `?${name}=true`;
        history.push(`${location.pathname}${newSearch}`);
      } else {
        history.goBack();
      }
    }
  };

  return [value, setValue];
}

export function useStringQuery(
  name: string,
  defaultValue?: string,
): [string | undefined, (v?: string) => void] {
  const history = useHistory();
  const searchParams = new URLSearchParams(useLocation().search);

  const setValue = (newValue?: string) => {
    if (value !== newValue) {
      if (newValue) {
        const newSearch =
          location.search.length > 1
            ? searchParams.get(name)
              ? location.search.replace(
                  `${name}=${value}`,
                  `${name}=${newValue}`,
                )
              : `${location.search}&${name}=${newValue}`
            : `?${name}=${newValue}`;
        history.push(`${location.pathname}${newSearch}`);
      } else {
        history.goBack();
      }
    }
  };

  const value = history.location.search.includes(`${name}=`)
    ? history.location.search.split(`${name}=`)[1]
    : defaultValue;

  return [value, setValue];
}

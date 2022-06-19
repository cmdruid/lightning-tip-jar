import useSWR from 'swr'

async function fetcher(...args) {
  return fetch(...args).then(res => res.json())
}

export function useAccount(slug, fetch = true) {
  const fetchUrl = `/api/account/read?slug=${slug}`
  const { data, error } = useSWR(fetch ? fetchUrl : null, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export function useLogin(fetch = true) {
  const fetchUrl = '/api/auth/login'
  const { data, error } = useSWR(fetch ? fetchUrl : null, fetcher, { refreshInterval: 5000 })

  return {
    data,
    loading: !error && !data,
    error,
  };
}

export function useTransactions(invoiceKey, fetch = true) {
  const fetchUrl = `/api/activity/getPayments?invoiceKey=${invoiceKey}`
  const { data, error } = useSWR(fetch ? fetchUrl : null, fetcher, { refreshInterval: 5000 })

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export function useUser(fetch = true) {
  const fetchUrl = '/api/user/read'
  const { data, error } = useSWR(fetch ? fetchUrl : null, fetcher)

  return {
    data,
    loading: !error && !data,
    error,
  };
}
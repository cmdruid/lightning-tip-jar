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

export function useUser(fetch = true) {
  const fetchUrl = '/api/user/read'
  const { data, error } = useSWR(fetch ? fetchUrl : null, fetcher)

  return {
    data,
    loading: !error && !data,
    error,
  };
}

export function useBalance(slug, fetch = true) {
  const fetchUrl = `/api/activity/balance?slug=${slug}`
  const { data, error } = useSWR(fetch ? fetchUrl : null, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export function useRecentPayments(key, fetch = true) {
  const fetchUrl = `/api/activity/payments?apikey=${key}`
  const { data, error } = useSWR(fetch ? fetchUrl : null, fetcher, { refreshInterval: 5000 })

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export function useRecentWithdraws(slug, fetch = true) {
  const fetchUrl = `/api/activity/withdraws?slug=${slug}`
  const { data, error } = useSWR(fetch ? fetchUrl : null, fetcher,{ refreshInterval: 5000 })

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

export function useWithdraw(slug, fetch = true) {
  const fetchUrl = `/api/withdraw/create?slug=${slug}`
  const { data, error } = useSWR(fetch ? fetchUrl : null, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

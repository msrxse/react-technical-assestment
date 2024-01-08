import { useMatches } from '@/hooks/matches'

import styles from './Matches.module.css'

export default function Matches() {
  const { isPending, error, data } = useMatches()

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className={styles.matches}>
      {data.map((each) => (
        <div key={each.id} className={styles.innerMatches}>
          <h1>{each.name}</h1>
          <p>{each.description}</p>
          <strong>👀 {each.subscribers_count}</strong> <strong>✨ {each.stargazers_count}</strong>{' '}
          <strong>🍴 {each.forks_count}</strong>
        </div>
      ))}
    </div>
  )
}

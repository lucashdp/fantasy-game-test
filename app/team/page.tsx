'use client'

import { useTeam } from '../../context/TeamContext'
import TeamStats from '../../components/TeamStats'

export default function TeamPage() {
  const { roster, budget, removePlayer } = useTeam()

  return (
    <div className='p-8 space-y-6'>
      <h1 className='text-2xl font-bold'>Meu Time</h1>
      <p data-testid='budget-amount'>
        Orçamento sobrando: <strong>R${budget}</strong>
      </p>

      <h2 className='text-lg font-semibold'>Jogadores do Time</h2>
      {roster.length === 0 ? (
        <p>Nenhum jogador adicionado ainda.</p>
      ) : (
        <ul className='space-y-1'>
          {roster.map((p) => (
            <li
              key={p.id}
              className='p-2 border rounded flex justify-between'
              data-testid='my-team-player'
            >
              <span>
                {p.name} ({p.position}) — R${p.price}
              </span>
              <button
                data-testid='remove-player-button'
                className='px-2 py-1 bg-red-500 text-white rounded'
                onClick={() => removePlayer(p.id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
      <TeamStats />
    </div>
  )
}

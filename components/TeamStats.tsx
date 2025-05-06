import { useTeam } from '../context/TeamContext'

export default function TeamStats() {
  const { roster, budget } = useTeam()

  const totalPlayers = roster.length
  const totalValue = roster.reduce((sum, player) => sum + player.price, 0)
  const averageValue = totalPlayers > 0 ? totalValue / totalPlayers : 0

  return (
    <div className='bg-white p-6 rounded-lg shadow'>
      <h2 className='text-xl font-semibold mb-4'>Estatísticas do Time</h2>
      <div className='space-y-4'>
        <div>
          <p className='text-gray-600'>Total de Jogadores</p>
          <p className='text-2xl font-bold'>{totalPlayers}</p>
        </div>
        <div>
          <p className='text-gray-600'>Valor Total do Time</p>
          <p className='text-2xl font-bold'>R${totalValue}</p>
        </div>
        <div>
          <p className='text-gray-600'>Valor Médio por Jogador</p>
          <p className='text-2xl font-bold'>R${averageValue.toFixed(2)}</p>
        </div>
        <div>
          <p className='text-gray-600'>Orçamento Restante</p>
          <p className='text-2xl font-bold'>R${budget}</p>
        </div>
      </div>
    </div>
  )
}

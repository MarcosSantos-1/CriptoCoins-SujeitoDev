import { HomeIcon } from "@heroicons/react/16/solid";
import { SearchIcon } from "lucide-react";
import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export interface CoinProps {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  vwap24Hr: string;
  changePercent24Hr: string;
  rank: string;
  suply: string;
  maxSuply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  explorer: string;
  formatedPrice: string;
  formatedMarket: string;
  formatedVolume: string;
}

interface DataProps {
  data: CoinProps[];
}

export function Home() {
  const [input, setInput] = useState(""); // Estado para a pesquisa
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Opcional: Estado para carregar mais

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input === "") return;
    navigate(`/detail/${input}`);
  }

  function handleLoad() {
    setOffset((prevOffset) => prevOffset + 10);
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  async function getData() {
    setIsLoading(true);
    const limit = 10; // Sempre buscar 10 itens por vez
    try {
      const response = await fetch(`https://api.coincap.io/v2/assets?limit=${limit}&offset=${offset}`);
      const data: DataProps = await response.json();
      const coinsData = data.data;

      const price = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      const priceCompact = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
      });
      const formatedResult = coinsData.map((item: CoinProps) => ({
        ...item,
        formatedPrice: price.format(Number(item.priceUsd)),
        formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
        formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr)),
      }));

      setCoins((prevCoins) => [...prevCoins, ...formatedResult]);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Filtro dinâmico para as moedas
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(input.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <main className="w-full max-w-6xl mx-auto my-8 p-3">
      {/* TÍTULO */}
      <div className="flex gap-2 items-center">
        <HomeIcon className="text-zinc-50 w-6 h-6" />
        <h2 className="font-semibold text-2xl"> Home</h2>
      </div>

      {/* BARRA DE PESQUISA */}
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex w-full max-w-3xl h-12 rounded-xl border-2 border-zinc-700 px-4 py-2 outline-none transition-shadow duration-300">
          <input
            type="text"
            placeholder="Digite o nome ou símbolo da moeda..."
            className="bg-transparent placeholder-zinc-300 font-normal flex flex-1 outline-none items-center"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <SearchIcon className="w-6 text-zinc-300" />
          </button>
        </div>
      </form>

      {/* CONTEÚDO */}
      <div className="">
        <table className="w-full border-collapse rounded-lg overflow-hidden bg-zinc-800 text-zinc-200 shadow-md">
          <thead className="bg-zinc-900 text-sm uppercase tracking-wide text-zinc-400 hidden md:table-header-group">
            <tr>
              <th className="px-4 py-3 text-left">Moeda</th>
              <th className="px-4 py-3 text-left">Valor de mercado</th>
              <th className="px-4 py-3 text-left">Preço</th>
              <th className="px-4 py-3 text-left">Volume</th>
              <th className="px-4 py-3 text-left">Mudança 24h</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin) => (
                <tr
                  key={coin.id}
                  className="border-t border-zinc-700 transition-colors hover:bg-zinc-700/60 flex flex-col md:table-row"
                >
                  <td
                    className="pl-4 py-3 flex justify-between items-center md:table-cell"
                    data-label="Moeda"
                  >
                    <span className="md:hidden font-medium">Moeda:</span>
                    <Link
                      to={`/detail/${coin.id}`}
                      className="inline-flex items-center space-x-2 font-medium hover:underline"
                    >
                      <img
                        src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                        alt={`${coin.name} Icon`}
                        className="w-6 h-6 hover:scale-150 duration-700 flex items-center mx-2"
                      />
                      <span>
                        {coin.name} | {coin.symbol}
                      </span>
                    </Link>
                  </td>
                  <td
                    className="px-4 py-3 flex justify-between items-center md:table-cell"
                    data-label="Valor de mercado"
                  >
                    <span className="md:hidden font-medium">Valor de mercado:</span>
                    {coin.formatedMarket}
                  </td>
                  <td
                    className="px-4 py-3 flex justify-between items-center md:table-cell"
                    data-label="Preço"
                  >
                    <span className="md:hidden font-medium">Preço:</span>
                    {coin.formatedPrice}
                  </td>
                  <td
                    className="px-4 py-3 flex justify-between items-center md:table-cell"
                    data-label="Volume"
                  >
                    <span className="md:hidden font-medium">Volume:</span>
                    {coin.formatedVolume}
                  </td>
                  <td
                    className={`px-4 py-3 flex justify-between items-center md:table-cell font-medium ${
                      Number(coin.changePercent24Hr) > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                    data-label="Mudança 24h"
                  >
                    <span className="md:hidden font-medium">Mudança 24h:</span>
                    {Number(coin.changePercent24Hr) > 0
                      ? `+${Number(coin.changePercent24Hr).toFixed(2)}%`
                      : `${Number(coin.changePercent24Hr).toFixed(2)}%`}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Nenhuma moeda encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="my-8 flex justify-center">
          <button
            className="px-4 py-2 bg-yellow-400 text-zinc-900 font-bold rounded-lg shadow-xl transition-shadow duration-300 hover:bg-yellow-500"
            onClick={handleLoad}
            disabled={isLoading} // Opcional: Desabilitar botão enquanto carrega
          >
            {isLoading ? "Carregando..." : "Carregar mais..."}
          </button>
        </div>
      </div>
    </main>
  );
}

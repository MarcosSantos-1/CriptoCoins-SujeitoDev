import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CoinProps } from "../home/home";

interface ResponseData{
  data: CoinProps
}
interface ErrorData{
  error:string
}
type DataProps = ResponseData | ErrorData

export function PageDetails() {
  const [coin, setCoin] = useState<CoinProps>()
  const [loading, setLoading] =useState(true)

  const { cripto } = useParams();
  const navigate = useNavigate();

  useEffect(() =>{
    async function getCoin() {
      try{
        fetch(`https://api.coincap.io/v2/assets/${cripto}`)
        .then(response => response.json())
        .then((data: DataProps) =>{
          if("error" in data){
            navigate("/")
            return;
          }
          
        const price = Intl.NumberFormat("en-US",{
            style: "currency",
            currency: "USD"
        })
        const priceCompact = Intl.NumberFormat("en-US",{
            style: "currency",
            currency: "USD",
            notation: "compact"
        })
          const resultData ={
            ...data.data,
            formatedPrice: price.format(Number(data.data.priceUsd)),
            formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
            formatedVolume:priceCompact.format(Number(data.data.volumeUsd24Hr)),
          }
          setCoin(resultData)
          setLoading(false)
        })
      }
      catch(err){
        console.log(err)
        navigate("/")
      }
    }
    getCoin()
  },[cripto])

  if(loading){
    return(
      <div className="min-h-96 w-full mx-auto flex flex-col gap-3 justify-center items-center">
          <h2 className="text-xl font-medium ">Carregando... </h2>
      </div>
    )
  }
    return (
      <main className="w-full max-w-6xl mx-auto my-8 p-3">
      {/*------TITULO ---*/}
          <div className="flex gap-2 items-center">
            <img src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`} // Use o ícone da moeda
                    alt={`${coin?.name} Icon`}
                    className="w-8 h-8 hover:scale-110 duration-700 flex items-center mx-1"
                    /> 
                <h2 className="font-semibold text-2xl"> {coin?.name} | {coin?.symbol}</h2>
            </div>

      {/* ------ INFORMAÇÕES PRINCIPAIS ------ */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preço */}
        <div className="p-4 border border-zinc-700 rounded-lg bg-zinc-800/70">
          <h3 className="text-sm font-semibold text-zinc-400">Preço Atual</h3>
          <p className="text-2xl font-bold text-yellow-400">
            {coin?.formatedPrice}
          </p>
        </div>

        {/* Valor de Mercado */}
        <div className="p-4 border border-zinc-700 rounded-lg bg-zinc-800/70">
          <h3 className="text-sm font-semibold text-zinc-400">Valor de Mercado</h3>
          <p className="text-2xl font-bold text-yellow-400">
            {coin?.formatedMarket}
          </p>
        </div>

        {/* Volume */}
        <div className="p-4 border border-zinc-700 rounded-lg bg-zinc-800/70">
          <h3 className="text-sm font-semibold text-zinc-400">Volume (24h)</h3>
          <p className="text-2xl font-bold text-yellow-400">
            {coin?.formatedVolume}
          </p>
        </div>

        {/* Mudança 24h */}
        <div
          className={`p-4 border border-zinc-700 rounded-lg bg-zinc-800/70 ${
            Number(coin?.changePercent24Hr) > 0
              ? "border-green-500"
              : "border-red-500"
          }`}
        >
          <h3 className="text-sm font-semibold text-zinc-400">
            Mudança em 24h
          </h3>
          <p
            className={`text-2xl font-bold ${
              Number(coin?.changePercent24Hr) > 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {Number(coin?.changePercent24Hr) > 0
              ? `+${Number(coin?.changePercent24Hr).toFixed(2)}%`
              : `${Number(coin?.changePercent24Hr).toFixed(2)}%`}
          </p>
        </div>
      </section>

      {/* ------ GRÁFICOS OU MAIS DETALHES ------ */}
      <section className="mt-8 p-4 border border-zinc-700 rounded-lg bg-zinc-800/70">
        <h3 className="text-lg font-semibold text-zinc-200 mb-4">
          Gráfico de Preço (em desenvolvimento)
        </h3>
        <div className="flex justify-center items-center h-48 bg-zinc-900 rounded-lg">
          {/* Reservado p/ integrar um gráfico */}
          <p className="text-zinc-400">Placeholder para Gráficos</p>
        </div>
      </section>

      </main>

    );
  }
  
  
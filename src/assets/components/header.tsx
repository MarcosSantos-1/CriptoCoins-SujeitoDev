import { CurrencyDollarIcon } from "@heroicons/react/16/solid";
import LanguageSelector from "../../assets/components/language-selector";
import { Link } from "react-router-dom";

export function Header() {
  
    return (
            <nav className="flex justify-around items-center h-16 w-full my-4">
            <Link to={`/`}>
                <div className="font-semibold flex gap-3 items-center select-none">
                    <div className="bg-yellow-600 w-10 h-10 rounded-full">
                    <CurrencyDollarIcon className="text-white"/>
                    </div>
                    <span className="text-3xl text-zinc-100 hover:text-zinc-200">CriptoCoins</span>
                </div>
            </Link>
            <div></div>
            <LanguageSelector/>
            </nav>    
      );
}


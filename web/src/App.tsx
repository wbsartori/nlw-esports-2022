import {GameController, MagnifyingGlassPlus} from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

import './styles/main.css';

import logoImg from './assets/Logo.svg';
import {GameBanner} from "./components/GameBanner";
import {CreateAdBanner} from "./components/CreateAdBanner";
import {useEffect, useState} from "react";

interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number
    }
}

function App() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        fetch('http://localhost:3333/games')
            .then(response => response.json())
            .then(data => {
                setGames(data);
            });
    });

    return (
        <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
            <img src={logoImg} alt=""/>

            <h1 className="text-6xl text-white font-black mt-20">
                Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
            </h1>

            <div className="grid grid-cols-6 gap-6 mt-16">
                {games.map(game => {
                        return (
                            <GameBanner
                                key={game.id}
                                title={game.title}
                                bannerUrl={game.bannerUrl}
                                adsCount={game._count.ads}/>
                        )
                    }
                )}
            </div>

            <Dialog.Root>
                <CreateAdBanner/>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/60 inset-0 fixed">
                        <Dialog.Content className="
                        fixed bg-[#2A2634]
                        py-8
                        px-10
                        text-white
                        top-1/2 left-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-lg w-[480px]
                        shadow-black/25
                        ">
                            <Dialog.Title className="text-3xl font-black">Públique um anúncio</Dialog.Title>

                            <Dialog.Content>
                                <form>
                                    <div>
                                        <label htmlFor="game">Qual o game?</label>
                                        <input type="text" id="game" placeholder="Selecione o game que deseja jogar"/>
                                    </div>
                                    <div>
                                        <label htmlFor="name">Seu nome (ou nickname)</label>
                                        <input type="text" id="name" placeholder="Como te chamam dentro do game ?"/>
                                    </div>
                                    <div>
                                        <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                                        <input type="number" id="yearsPlaying" placeholder="Tudo bem ser ZERO"/>
                                    </div>
                                    <div>
                                        <label htmlFor="discord">Qual seu Discord?</label>
                                        <input type="text" id="discord" placeholder="Usuario#0000"/>
                                    </div>
                                    <div>
                                        <div>
                                            <label htmlFor="weekDays">Quando costuma jogar??</label>
                                        </div>
                                        <div>
                                            <label htmlFor="hourStart">Qual horário do dia?</label>
                                            <input type="time" id="hourStart" placeholder="De"/>
                                            <input type="time" id="hourEnd" placeholder="Até"/>
                                        </div>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        Costumo me conectar ao chat de voz
                                    </div>
                                    <footer>
                                        <button>Cancelar</button>
                                        <button type="submit">
                                            <GameController />
                                            Encontrar duo
                                        </button>
                                    </footer>
                                </form>
                            </Dialog.Content>
                        </Dialog.Content>
                    </Dialog.Overlay>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}

export default App

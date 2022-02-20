import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Layout } from '@/components/Layout';
import { PizzaItem } from '@/components/PizzaItem';
import { getPizzas, getPizzaDetails } from '@/api';
import { PizzaContext } from '@/context/PizzaContext';
import { CategoryTag } from '@/components/CategoryTag';

interface HomeProps {
    pizzas: GrouppedPizzaType;
}

const Home: NextPage<HomeProps> = ({ pizzas }) => {
    const router = useRouter();
    const [selected, setSelected] = useState<number>(0);
    const pizzaContext = useContext(PizzaContext);
    const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        sectionRefs.current = sectionRefs.current.slice(0, Object.keys(pizzas).length);
    }, [pizzas]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            sectionRefs.current.forEach((section, index) => {
                if (
                    section &&
                    scrollTop >= section.offsetTop - 70 &&
                    scrollTop < section.offsetTop + section.offsetHeight
                ) {
                    setSelected(index);
                }
            });
        };
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        (async () => {
            if (typeof router.query.id === 'string') {
                await selectAndShowPizzaDetails(router.query.id);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectAndShowPizzaDetails = async (id: string) => {
        try {
            let pizza = await getPizzaDetails(id);
            pizzaContext?.storePizzaDetails(pizza);
            pizzaContext?.toggleDrawer(id);
        } catch (error) {}
    };

    const scrollToTargetAdjusted = (id: string) => {
        var element = document.getElementById(id);
        if (element) {
            var headerOffset = 45 + 5;
            var elementPosition = element.getBoundingClientRect().top;
            var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // window.location.hash = id;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <Layout>
            <main className="space-y-6">
                <div className="space-x-1 overflow-y-auto flex flex-row px-4 pt-2 pb-1 max-w-7xl sticky top-0 z-20 bg-classy-deemLight   border-b-4 border-classy-slate">
                    {pizzas &&
                        Object.keys(pizzas).map((category, i) => (
                            <h1
                                className={classNames('category-title', {
                                    'category-selected': i === selected,
                                })}
                                onClick={() => scrollToTargetAdjusted(category)}
                                key={category}
                            >
                                {category}
                            </h1>
                        ))}
                </div>

                {/* Pizza Listing */}
                <div className="max-w-7xl space-y-20 px-4 z-10">
                    {pizzas &&
                        Object.keys(pizzas).map((category, i) => (
                            <div
                                key={category}
                                id={category}
                                ref={(el) => (sectionRefs.current[i] = el)}
                            >
                                {/* Category Tag */}
                                <CategoryTag
                                    category={category}
                                    onClick={() => scrollToTargetAdjusted(category)}
                                />

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                                    {/* Pizza Listing */}
                                    {pizzas[category].map((pizza, i) => (
                                        <PizzaItem
                                            pizza={pizza}
                                            key={i}
                                            onClick={() => selectAndShowPizzaDetails(pizza.id!)}
                                            liked={pizzaContext?.likedPizzas.includes(pizza.id!)}
                                            toggleLike={pizzaContext?.toggleLike}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            </main>
        </Layout>
    );
};

Home.getInitialProps = async () => {
    const pizzas = await getPizzas();
    return {
        pizzas,
    };
};

export default Home;

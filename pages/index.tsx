import { useContext, useEffect, useRef, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { FixedSizeList as List } from 'react-window';

import { Icon } from '@/components/Icon';
import { Layout } from '@/components/Layout';
import { PizzaContext } from '@/context/PizzaContext';
import { CategoriesTile } from '@/components/CategoriesTile';

import { PizzaList } from '@/components/PizzaList';
import { PizzaItem } from '@/components/PizzaItem';
import { CartContext } from '@/context/CartContext';
import { getPizzas, getPizzaDetails } from '@/api';
import { StickyBottomWidget } from '@/components/StickyBottomWidget';
import useMediaQuery from '@/util/hooks/useMediaQuery';

interface HomeProps {
    pizzas: GrouppedPizzaType;
}

const Home: NextPage<HomeProps> = ({ pizzas }) => {
    const router = useRouter();
    const [pizzaList, setPizzaList] = useState<Partial<PizzaItemType>[]>([]);
    const [selectedPizzaId, setSelectedPizzaId] = useState<string>();
    const [selected, setSelected] = useState<number>(0);
    const pizzaContext = useContext(PizzaContext);
    const cartContext = useContext(CartContext);
    const SM = useMediaQuery('(min-width: 640px)');
    const LG = useMediaQuery('(min-width: 1024px)');

    // const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        // sectionRefs.current = sectionRefs.current.slice(0, Object.keys(pizzas).length);
        let newPizzaList: Partial<PizzaItemType>[] = [];
        Object.keys(pizzas).forEach((category, i) => {
            newPizzaList = [...newPizzaList, ...pizzas[category]];
        });
        setPizzaList(newPizzaList);
    }, [pizzas]);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollTop = window.scrollY;
    //         sectionRefs.current.forEach((section, index) => {
    //             if (
    //                 section &&
    //                 scrollTop >= section.offsetTop - 70 &&
    //                 scrollTop < section.offsetTop + section.offsetHeight
    //             ) {
    //                 setSelected(index);
    //             }
    //         });
    //     };
    //     document.addEventListener('scroll', handleScroll);
    //     return () => {
    //         document.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    useEffect(() => {
        if (typeof router.query.id === 'string') {
            setSelectedPizzaId(router.query.id);
        }
    }, [router.query.id]);

    useEffect(() => {
        (async () => {
            if (selectedPizzaId) {
                await selectAndShowPizzaDetails(selectedPizzaId);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPizzaId]);

    const selectAndShowPizzaDetails = async (id: string) => {
        try {
            let pizza = await getPizzaDetails(id);
            pizzaContext?.storePizzaDetails(pizza);
            pizzaContext?.toggleDrawer(id);
        } catch (error) {}
    };
    const onPizzaDraweClose = () => {
        setSelectedPizzaId(undefined);
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

    let listObj = {
        columns: LG ? 3 : SM ? 2 : 1,
    };

    return (
        <Layout onDrawerClose={onPizzaDraweClose}>
            <main className="space-y-6">
                {/* {pizzas && (
                    <CategoriesTile
                        pizzas={pizzas}
                        selectedIndex={selected}
                        onSelect={(id) => scrollToTargetAdjusted(id)}
                    />
                )} */}

                {/* Pizza Listing */}
                <div className="max-w-7xl space-y-20 z-10">
                    {/* <PizzaList
                                pizzas={pizzas}
                                likedPizzas={pizzaContext?.likedPizzas || []}
                                onLikeClick={(id) => pizzaContext?.toggleLike(id)}
                                onSelectCategory={(id) => scrollToTargetAdjusted(id)}
                                onSelectPizza={(id) => setSelectedPizzaId(id)}
                                sectionRefs={sectionRefs}
                            /> */}
                    {pizzaList.length > 0 && (
                        <List
                            height={window.innerHeight - 90}
                            itemCount={pizzaList.length / listObj.columns}
                            itemSize={LG ? 290 : SM ? 280 : 265}
                            width={window.innerWidth}
                        >
                            {(props) => (
                                <div style={props.style}>
                                    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-3 max-w-7xl m-2">
                                        {pizzaList
                                            .slice(props.index, props.index + listObj.columns)
                                            .map((item, i) => (
                                                <PizzaItem key={item.id} pizza={item} />
                                            ))}
                                    </div>
                                </div>
                            )}
                        </List>
                    )}
                </div>
            </main>
            {/* Cart Widget if Cart Items > 0 */}
            {cartContext && cartContext?.items.length > 0 && (
                <StickyBottomWidget link="/cart">
                    <Icon icon="shoppingCart" size="sm" />
                    <p className="bg-classy-white rounded-xl px-2 py-1 font-sans font-bold">
                        {cartContext?.items.reduce((sum, item) => sum + item.quantity, 0) || ''}
                    </p>
                </StickyBottomWidget>
            )}
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const pizzas = await getPizzas();
    return {
        props: {
            pizzas,
        },
        revalidate: 3600,
    };
};

export default Home;

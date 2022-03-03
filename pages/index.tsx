import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { VariableSizeList as List } from 'react-window';

import { Icon } from '@/components/Icon';
import { Layout } from '@/components/Layout';
import { PizzaContext } from '@/context/PizzaContext';
import { CategoriesTile } from '@/components/CategoriesTile';

import { PizzaList } from '@/components/PizzaList';
import { CartContext } from '@/context/CartContext';
import { getPizzas, getPizzaDetails } from '@/api';
import { StickyBottomWidget } from '@/components/StickyBottomWidget';

interface HomeProps {
    pizzas: GrouppedPizzaType;
}

const Home: NextPage<HomeProps> = ({ pizzas }) => {
    const router = useRouter();
    const sizeMap = useRef({});
    const listRef = useRef<any>();
    const cartContext = useContext(CartContext);
    const pizzaContext = useContext(PizzaContext);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [categoryList, setCategoryList] = useState<string[]>([]);
    const [selectedPizzaId, setSelectedPizzaId] = useState<string>();

    useEffect(() => {
        setCategoryList(Object.keys(pizzas));
    }, [pizzas]);

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
    const setSize = useCallback((index, size) => {
        sizeMap.current = { ...sizeMap.current, [index]: size };
        listRef.current.resetAfterIndex(index);
    }, []);
    const getSize = useCallback(index => {
        // @ts-ignore
        return sizeMap.current[index] || 500;
    }, []);
    const scrollToIndex = (index: number) => {
        listRef.current.scrollToItem(index, "start");
        setSelectedCategoryIndex(index);
    }

    return (
        <Layout onDrawerClose={onPizzaDraweClose}>
            <main>
                {categoryList.length > 0 && (
                    <CategoriesTile
                        categories={categoryList}
                        selectedIndex={selectedCategoryIndex}
                        onSelect={(i) => scrollToIndex(i)}
                    />
                )}

                {/* Pizza Listing */}
                <div className="z-10 mt-2">
                    {categoryList.length > 0 && (
                        <List
                            height={window.innerHeight - 122}
                            itemCount={categoryList.length}
                            itemSize={getSize}
                            width={window.innerWidth}
                            ref={listRef}
                            onItemsRendered={(data) => {
                                if (data.visibleStopIndex !== selectedCategoryIndex)
                                    setSelectedCategoryIndex(data.visibleStopIndex);
                            }}
                        >
                            {(props) => (
                                <div style={props.style}>
                                    <PizzaList
                                        pizzas={pizzas[categoryList[props.index]]}
                                        onSelectPizza={(id) => setSelectedPizzaId(id)}
                                        likedPizzas={pizzaContext?.likedPizzas || []}
                                        setSize={(size) => setSize(props.index, size)}
                                        category={categoryList[props.index]}
                                        onLikeClick={(id) => pizzaContext?.toggleLike(id)}
                                    />
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

import { useContext, useEffect, useRef, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

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
    const [selectedPizzaId, setSelectedPizzaId] = useState<string>();
    const [selected, setSelected] = useState<number>(0);
    const pizzaContext = useContext(PizzaContext);
    const cartContext = useContext(CartContext);
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

    return (
        <Layout onDrawerClose={onPizzaDraweClose}>
            <main className="space-y-6">
                {pizzas && (
                    <CategoriesTile
                        pizzas={pizzas}
                        selectedIndex={selected}
                        onSelect={(id) => scrollToTargetAdjusted(id)}
                    />
                )}

                {/* Pizza Listing */}
                <div className="max-w-7xl space-y-20 px-4 z-10">
                    {pizzas && (
                        <PizzaList
                            pizzas={pizzas}
                            likedPizzas={pizzaContext?.likedPizzas || []}
                            onLikeClick={(id) => pizzaContext?.toggleLike(id)}
                            onSelectCategory={(id) => scrollToTargetAdjusted(id)}
                            onSelectPizza={(id) => setSelectedPizzaId(id)}
                            sectionRefs={sectionRefs}
                        />
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

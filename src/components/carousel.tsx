import React, { memo, useState, useEffect, CSSProperties } from 'react';

interface ICarousel {
    children?: JSX.Element | JSX.Element[];
}

export const Carousel = memo((props: ICarousel) => {
    const { children } = props;
    const [slideIndexToShow, setSlideIndexToShow] = useState(0);
    const [fade, setFade] = useState(false);

    const onClickNext = () => {
        if (slideIndexToShow < React.Children.toArray(children).length - 1)
            setSlideIndexToShow(slideIndexToShow + 1);
        else
            setSlideIndexToShow(0);
        
        setFade(true);
    }

    const onClickPrev = () => {
        if (slideIndexToShow - 1 > 0)
            setSlideIndexToShow(slideIndexToShow - 1);
        else
            setSlideIndexToShow(React.Children.toArray(children).length - 1);
        
            setFade(true);
    }

    const fadeStyle: CSSProperties = {
        opacity: fade ? 0 : 1,
        transition: '500ms opacity'
    }

    useEffect(() => {
        if (fade) {
            setTimeout(() => setFade(false), 500);
        }
    },[fade])

    return <div>
        <button
            onClick={onClickPrev}
        >
            prev
        </button>
        <div
            style={fadeStyle}
        >
        {
            React.Children.toArray(children)[slideIndexToShow]
            }
            </div>
        <button
            onClick={onClickNext}
        >
            next
        </button>
    </div>
})
import React from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { createRef } from 'react';

import api, { IEntity, IImage } from '../api_dev';

export type ImageContainerProps = {
    image: IImage | string,
    context?: IEntity,
    width: number,
    height: number,
}

const relativePosition: "relative" | "absolute" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "-webkit-sticky" | "fixed" | "static" | "sticky" | undefined = 'relative';

const absolutePosition: "relative" | "absolute" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "-webkit-sticky" | "fixed" | "static" | "sticky" | undefined = 'absolute';

const containerStyleBase = {
    position: relativePosition,
    overflow: 'hidden',
    border: 'thin solid yellow',
};

const loresStyleBase = {
    top: 0,
    left: 0,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    filter: 'blur(30px) grayscale(0.5)',
};

const hiresStyleBase = {
    top: 0,
    left: 0,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: absolutePosition,
    opacity: 0,
    transitionDuration: '2s',
    transitionPropoperty: 'opacity',
    transitionTimingFunction: 'ease-out',
};

const log = api.flogger('EntityImage');

const ImageContainer = (props: ImageContainerProps) => {

    const { image, context, width, height } = props;
    
    const local = useRef<any>({}).current;
    const ref = {
        container: createRef<HTMLDivElement>(),
        lores: createRef<HTMLDivElement>(),
        hires: createRef<HTMLDivElement>(),
    };
    
    const loresSrc = useMemo(() => {
        const url = `${api.getPathForImage(image, context)}/lores.jpg?${Date.now()}`;
        log.orange('memoize loresSrc:', url);
        return `${url}`
    }, [image, context]);

    const hiresSrc = useMemo(() => {
        const url = `${api.getPathForImage(image, context)}/hires.jpg?${Date.now()}`;
        log.orange('memoize hiresSrc:', url);
        return `${url}`
    }, [image, context]);
    
    
    const containerStyle = useMemo(() => {
        log.orange('memoize containerStyle')
        return {
            ...containerStyleBase,
            width,
            height,
            position: 'relative' as 'absolute',
        };
    }, [width, height]);

    const loresStyle = useMemo(() => {
        log.orange('memoize loresStyle')
        return {
            ...loresStyleBase,
            width,
            height,
            backgroundImage: `url("${loresSrc}")`,
        };
    }, [width, height, loresSrc]);

    const hiresStyle = useMemo(() => {
        log.orange('memoize hiresStyle')
        return {
            ...hiresStyleBase,
            width,
            height,
            backgroundImage: `url("${hiresSrc}")`,
        };
    }, [width, height, hiresSrc]);

    // Effect 1
    useEffect(() => {
        log.green('effect 1');        
        const lores = new Image();
        lores.onload = (e: any) => {
            local.loresLoaded = true;
            log.yellow('lores loaded:', e.timeStamp);
        }
        lores.src = loresSrc;
        return () => log.red('effect 1 unloaded');
    }, [loresSrc, local]);

    // Effect 2
    useEffect(() => {
        log.green('effect 2');        
        const hires = new Image();
        hires.onload = (e: any) => {
            local.hiresLoaded = true;
            log.yellow('hires loaded:', e.timeStamp);
            const fadeInHiRes = () => {
                ref.hires.current!.style.opacity = '1';
            }
            if (api.app.isDevEnv) {
                // simulate a delay in dev env...
                setTimeout(fadeInHiRes, 500);
            }
            else {
                fadeInHiRes();
            }
        }
        hires.src = hiresSrc;
        return () => log.red('effect 2 unloaded');
    }, [hiresSrc, local, ref.hires]);

    return <div 
        ref={ref.container} 
        style={containerStyle}>
        <div 
            ref={ref.lores}
            style={loresStyle}
        />
        <div 
            ref={ref.hires}
            style={hiresStyle}
        />
    </div>
}

export default ImageContainer;
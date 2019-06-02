
import { App } from './app';
import soma, { sub } from './funcoes';
import * as funcoes from './funcoes';
import { executaPromise } from './async-await';

const ignore = () => {
    console.log('Soma:', soma(4, 6), 'Subtracao:', sub(4, 6));
    console.log(funcoes);
    executaPromise();
};

new App();

import{$ as a,r as u}from"./react-CNM1HoWL.js";const i={prefix:String(Math.round(Math.random()*1e10)),current:0},s=a.createContext(i),f=a.createContext(!1);let l=!!(typeof window<"u"&&window.document&&window.document.createElement),$=new WeakMap;function p(t=!1){let e=u.useContext(s),n=u.useRef(null);if(n.current===null&&!t){var r,c;let o=(c=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)===null||c===void 0||(r=c.ReactCurrentOwner)===null||r===void 0?void 0:r.current;if(o){let d=$.get(o);d==null?$.set(o,{id:e.current,state:o.memoizedState}):o.memoizedState!==d.state&&(e.current=d.id,$.delete(o))}n.current=++e.current}return n.current}function x(t){let e=u.useContext(s);e===i&&!l&&console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.");let n=p(!!t),r=`react-aria${e.prefix}`;return t||`${r}-${n}`}function b(t){let e=a.useId(),[n]=u.useState(w()),r=n?"react-aria":`react-aria${i.prefix}`;return t||`${r}-${e}`}const y=typeof a.useId=="function"?b:x;function v(){return!1}function S(){return!0}function m(t){return()=>{}}function w(){return typeof a.useSyncExternalStore=="function"?a.useSyncExternalStore(m,v,S):u.useContext(f)}export{y as $};

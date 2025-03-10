import{c as N,d as C,e as D}from"./@babel-ZR4Keixg.js";import{S as A}from"./@tanem-BFu4Q50P.js";import{p as t}from"./prop-types-DQw5ku1y.js";import{r as m}from"./react-CNM1HoWL.js";var O=function(s){var a=(s==null?void 0:s.ownerDocument)||document;return a.defaultView||window},U=function(s,a){for(var r in s)if(!(r in a))return!0;for(var e in a)if(s[e]!==a[e])return!0;return!1},H=["afterInjection","beforeInjection","desc","evalScripts","fallback","httpRequestWithCredentials","loading","renumerateIRIElements","src","title","useRequestCache","wrapper"],v="http://www.w3.org/2000/svg",q="http://www.w3.org/1999/xlink",V=function(c){function s(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return r=c.call.apply(c,[this].concat(n))||this,r.initialState={hasError:!1,isLoading:!0},r.state=r.initialState,r._isMounted=!1,r.reactWrapper=void 0,r.nonReactWrapper=void 0,r.refCallback=function(u){r.reactWrapper=u},r}N(s,c);var a=s.prototype;return a.renderSVG=function(){var e=this;if(this.reactWrapper instanceof O(this.reactWrapper).Node){var n=this.props,o=n.desc,u=n.evalScripts,S=n.httpRequestWithCredentials,E=n.renumerateIRIElements,x=n.src,b=n.title,G=n.useRequestCache,w=this.props.onError,g=this.props.beforeInjection,y=this.props.afterInjection,f=this.props.wrapper,l,p;f==="svg"?(l=document.createElementNS(v,f),l.setAttribute("xmlns",v),l.setAttribute("xmlns:xlink",q),p=document.createElementNS(v,f)):(l=document.createElement(f),p=document.createElement(f)),l.appendChild(p),p.dataset.src=x,this.nonReactWrapper=this.reactWrapper.appendChild(l);var I=function(i){if(e.removeSVG(),!e._isMounted){w(i);return}e.setState(function(){return{hasError:!0,isLoading:!1}},function(){w(i)})},L=function(i,d){if(i){I(i);return}e._isMounted&&e.setState(function(){return{isLoading:!1}},function(){try{y(d)}catch(h){I(h)}})},M=function(i){if(i.setAttribute("role","img"),o){var d=i.querySelector(":scope > desc");d&&i.removeChild(d);var h=document.createElement("desc");h.innerHTML=o,i.prepend(h)}if(b){var R=i.querySelector(":scope > title");R&&i.removeChild(R);var j=document.createElement("title");j.innerHTML=b,i.prepend(j)}try{g(i)}catch(k){I(k)}};A(p,{afterEach:L,beforeEach:M,cacheRequests:G,evalScripts:u,httpRequestWithCredentials:S,renumerateIRIElements:E})}},a.removeSVG=function(){var e;(e=this.nonReactWrapper)!=null&&e.parentNode&&(this.nonReactWrapper.parentNode.removeChild(this.nonReactWrapper),this.nonReactWrapper=null)},a.componentDidMount=function(){this._isMounted=!0,this.renderSVG()},a.componentDidUpdate=function(e){var n=this;U(C({},e),this.props)&&this.setState(function(){return n.initialState},function(){n.removeSVG(),n.renderSVG()})},a.componentWillUnmount=function(){this._isMounted=!1,this.removeSVG()},a.render=function(){var e=this.props;e.afterInjection,e.beforeInjection,e.desc,e.evalScripts;var n=e.fallback;e.httpRequestWithCredentials;var o=e.loading;e.renumerateIRIElements,e.src,e.title,e.useRequestCache;var u=e.wrapper,S=D(e,H),E=u;return m.createElement(E,C({},S,{ref:this.refCallback},u==="svg"?{xmlns:v,xmlnsXlink:q}:{}),this.state.isLoading&&o&&m.createElement(o,null),this.state.hasError&&n&&m.createElement(n,null))},s}(m.Component);V.defaultProps={afterInjection:function(){},beforeInjection:function(){},desc:"",evalScripts:"never",fallback:null,httpRequestWithCredentials:!1,loading:null,onError:function(){},renumerateIRIElements:!0,title:"",useRequestCache:!0,wrapper:"div"};V.propTypes={afterInjection:t.func,beforeInjection:t.func,desc:t.string,evalScripts:t.oneOf(["always","once","never"]),fallback:t.oneOfType([t.func,t.object,t.string]),httpRequestWithCredentials:t.bool,loading:t.oneOfType([t.func,t.object,t.string]),onError:t.func,renumerateIRIElements:t.bool,src:t.string.isRequired,title:t.string,useRequestCache:t.bool,wrapper:t.oneOf(["div","span","svg"])};export{V as R};

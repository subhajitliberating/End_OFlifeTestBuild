var B=Uint8Array,P=Uint16Array,kr=Int32Array,or=new B([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ur=new B([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),gr=new B([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Sr=function(r,a){for(var n=new P(31),e=0;e<31;++e)n[e]=a+=1<<r[e-1];for(var v=new kr(n[30]),e=1;e<30;++e)for(var f=n[e];f<n[e+1];++f)v[f]=f-n[e]<<5|e;return{b:n,r:v}},Tr=Sr(or,2),Cr=Tr.b,Mr=Tr.r;Cr[28]=258,Mr[258]=28;var Er=Sr(ur,0),sr=Er.b,zr=Er.r,xr=new P(32768);for(var g=0;g<32768;++g){var j=(g&43690)>>1|(g&21845)<<1;j=(j&52428)>>2|(j&13107)<<2,j=(j&61680)>>4|(j&3855)<<4,xr[g]=((j&65280)>>8|(j&255)<<8)>>1}var Y=function(r,a,n){for(var e=r.length,v=0,f=new P(a);v<e;++v)r[v]&&++f[r[v]-1];var o=new P(a);for(v=1;v<a;++v)o[v]=o[v-1]+f[v-1]<<1;var w;if(n){w=new P(1<<a);var t=15-a;for(v=0;v<e;++v)if(r[v])for(var F=v<<4|r[v],i=a-r[v],l=o[r[v]-1]++<<i,c=l|(1<<i)-1;l<=c;++l)w[xr[l]>>t]=F}else for(w=new P(e),v=0;v<e;++v)r[v]&&(w[v]=xr[o[r[v]-1]++]>>15-r[v]);return w},L=new B(288);for(var g=0;g<144;++g)L[g]=8;for(var g=144;g<256;++g)L[g]=9;for(var g=256;g<280;++g)L[g]=7;for(var g=280;g<288;++g)L[g]=8;var fr=new B(32);for(var g=0;g<32;++g)fr[g]=5;var Dr=Y(L,9,0),Gr=Y(L,9,1),Hr=Y(fr,5,0),Jr=Y(fr,5,1),hr=function(r){for(var a=r[0],n=1;n<r.length;++n)r[n]>a&&(a=r[n]);return a},V=function(r,a,n){var e=a/8|0;return(r[e]|r[e+1]<<8)>>(a&7)&n},wr=function(r,a){var n=a/8|0;return(r[n]|r[n+1]<<8|r[n+2]<<16)>>(a&7)},Fr=function(r){return(r+7)/8|0},Ur=function(r,a,n){return(n==null||n>r.length)&&(n=r.length),new B(r.subarray(a,n))},Kr=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],W=function(r,a,n){var e=new Error(a||Kr[r]);if(e.code=r,Error.captureStackTrace&&Error.captureStackTrace(e,W),!n)throw e;return e},Nr=function(r,a,n,e){var v=r.length,f=0;if(!v||a.f&&!a.l)return n||new B(0);var o=!n,w=o||a.i!=2,t=a.i;o&&(n=new B(v*3));var F=function(ar){var nr=n.length;if(ar>nr){var d=new B(Math.max(nr*2,ar));d.set(n),n=d}},i=a.f||0,l=a.p||0,c=a.b||0,M=a.l,E=a.d,x=a.m,s=a.n,R=v*8;do{if(!M){i=V(r,l,1);var H=V(r,l+1,3);if(l+=3,H)if(H==1)M=Gr,E=Jr,x=9,s=5;else if(H==2){var O=V(r,l,31)+257,A=V(r,l+10,15)+4,h=O+V(r,l+5,31)+1;l+=14;for(var u=new B(h),S=new B(19),z=0;z<A;++z)S[gr[z]]=V(r,l+z*3,7);l+=A*3;for(var q=hr(S),_=(1<<q)-1,J=Y(S,q,1),z=0;z<h;){var D=J[V(r,l,_)];l+=D&15;var y=D>>4;if(y<16)u[z++]=y;else{var T=0,b=0;for(y==16?(b=3+V(r,l,3),l+=2,T=u[z-1]):y==17?(b=3+V(r,l,7),l+=3):y==18&&(b=11+V(r,l,127),l+=7);b--;)u[z++]=T}}var G=u.subarray(0,O),C=u.subarray(O);x=hr(G),s=hr(C),M=Y(G,x,1),E=Y(C,s,1)}else W(1);else{var y=Fr(l)+4,I=r[y-4]|r[y-3]<<8,U=y+I;if(U>v){t&&W(0);break}w&&F(c+I),n.set(r.subarray(y,U),c),a.b=c+=I,a.p=l=U*8,a.f=i;continue}if(l>R){t&&W(0);break}}w&&F(c+131072);for(var rr=(1<<x)-1,Q=(1<<s)-1,Z=l;;Z=l){var T=M[wr(r,l)&rr],K=T>>4;if(l+=T&15,l>R){t&&W(0);break}if(T||W(2),K<256)n[c++]=K;else if(K==256){Z=l,M=null;break}else{var N=K-254;if(K>264){var z=K-257,k=or[z];N=V(r,l,(1<<k)-1)+Cr[z],l+=k}var X=E[wr(r,l)&Q],m=X>>4;X||W(3),l+=X&15;var C=sr[m];if(m>3){var k=ur[m];C+=wr(r,l)&(1<<k)-1,l+=k}if(l>R){t&&W(0);break}w&&F(c+131072);var p=c+N;if(c<C){var ir=f-C,lr=Math.min(C,p);for(ir+c<0&&W(3);c<lr;++c)n[c]=e[ir+c]}for(;c<p;++c)n[c]=n[c-C]}}a.l=M,a.p=Z,a.b=c,a.f=i,M&&(i=1,a.m=x,a.d=E,a.n=s)}while(!i);return c!=n.length&&o?Ur(n,0,c):n.subarray(0,c)},$=function(r,a,n){n<<=a&7;var e=a/8|0;r[e]|=n,r[e+1]|=n>>8},er=function(r,a,n){n<<=a&7;var e=a/8|0;r[e]|=n,r[e+1]|=n>>8,r[e+2]|=n>>16},tr=function(r,a){for(var n=[],e=0;e<r.length;++e)r[e]&&n.push({s:e,f:r[e]});var v=n.length,f=n.slice();if(!v)return{t:Br,l:0};if(v==1){var o=new B(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function(U,O){return U.f-O.f}),n.push({s:-1,f:25001});var w=n[0],t=n[1],F=0,i=1,l=2;for(n[0]={s:-1,f:w.f+t.f,l:w,r:t};i!=v-1;)w=n[n[F].f<n[l].f?F++:l++],t=n[F!=i&&n[F].f<n[l].f?F++:l++],n[i++]={s:-1,f:w.f+t.f,l:w,r:t};for(var c=f[0].s,e=1;e<v;++e)f[e].s>c&&(c=f[e].s);var M=new P(c+1),E=br(n[i-1],M,0);if(E>a){var e=0,x=0,s=E-a,R=1<<s;for(f.sort(function(O,A){return M[A.s]-M[O.s]||O.f-A.f});e<v;++e){var H=f[e].s;if(M[H]>a)x+=R-(1<<E-M[H]),M[H]=a;else break}for(x>>=s;x>0;){var y=f[e].s;M[y]<a?x-=1<<a-M[y]++-1:++e}for(;e>=0&&x;--e){var I=f[e].s;M[I]==a&&(--M[I],++x)}E=a}return{t:new B(M),l:E}},br=function(r,a,n){return r.s==-1?Math.max(br(r.l,a,n+1),br(r.r,a,n+1)):a[r.s]=n},yr=function(r){for(var a=r.length;a&&!r[--a];);for(var n=new P(++a),e=0,v=r[0],f=1,o=function(t){n[e++]=t},w=1;w<=a;++w)if(r[w]==v&&w!=a)++f;else{if(!v&&f>2){for(;f>138;f-=138)o(32754);f>2&&(o(f>10?f-11<<5|28690:f-3<<5|12305),f=0)}else if(f>3){for(o(v),--f;f>6;f-=6)o(8304);f>2&&(o(f-3<<5|8208),f=0)}for(;f--;)o(v);f=1,v=r[w]}return{c:n.subarray(0,e),n:a}},vr=function(r,a){for(var n=0,e=0;e<a.length;++e)n+=r[e]*a[e];return n},qr=function(r,a,n){var e=n.length,v=Fr(a+2);r[v]=e&255,r[v+1]=e>>8,r[v+2]=r[v]^255,r[v+3]=r[v+1]^255;for(var f=0;f<e;++f)r[v+f+4]=n[f];return(v+4+e)*8},Ar=function(r,a,n,e,v,f,o,w,t,F,i){$(a,i++,n),++v[256];for(var l=tr(v,15),c=l.t,M=l.l,E=tr(f,15),x=E.t,s=E.l,R=yr(c),H=R.c,y=R.n,I=yr(x),U=I.c,O=I.n,A=new P(19),h=0;h<H.length;++h)++A[H[h]&31];for(var h=0;h<U.length;++h)++A[U[h]&31];for(var u=tr(A,7),S=u.t,z=u.l,q=19;q>4&&!S[gr[q-1]];--q);var _=F+5<<3,J=vr(v,L)+vr(f,fr)+o,D=vr(v,c)+vr(f,x)+o+14+3*q+vr(A,S)+2*A[16]+3*A[17]+7*A[18];if(t>=0&&_<=J&&_<=D)return qr(a,i,r.subarray(t,t+F));var T,b,G,C;if($(a,i,1+(D<J)),i+=2,D<J){T=Y(c,M,0),b=c,G=Y(x,s,0),C=x;var rr=Y(S,z,0);$(a,i,y-257),$(a,i+5,O-1),$(a,i+10,q-4),i+=14;for(var h=0;h<q;++h)$(a,i+3*h,S[gr[h]]);i+=3*q;for(var Q=[H,U],Z=0;Z<2;++Z)for(var K=Q[Z],h=0;h<K.length;++h){var N=K[h]&31;$(a,i,rr[N]),i+=S[N],N>15&&($(a,i,K[h]>>5&127),i+=K[h]>>12)}}else T=Dr,b=L,G=Hr,C=fr;for(var h=0;h<w;++h){var k=e[h];if(k>255){var N=k>>18&31;er(a,i,T[N+257]),i+=b[N+257],N>7&&($(a,i,k>>23&31),i+=or[N]);var X=k&31;er(a,i,G[X]),i+=C[X],X>3&&(er(a,i,k>>5&8191),i+=ur[X])}else er(a,i,T[k]),i+=b[k]}return er(a,i,T[256]),i+b[256]},Pr=new kr([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Br=new B(0),Qr=function(r,a,n,e,v,f){var o=f.z||r.length,w=new B(e+o+5*(1+Math.ceil(o/7e3))+v),t=w.subarray(e,w.length-v),F=f.l,i=(f.r||0)&7;if(a){i&&(t[0]=f.r>>3);for(var l=Pr[a-1],c=l>>13,M=l&8191,E=(1<<n)-1,x=f.p||new P(32768),s=f.h||new P(E+1),R=Math.ceil(n/3),H=2*R,y=function(cr){return(r[cr]^r[cr+1]<<R^r[cr+2]<<H)&E},I=new kr(25e3),U=new P(288),O=new P(32),A=0,h=0,u=f.i||0,S=0,z=f.w||0,q=0;u+2<o;++u){var _=y(u),J=u&32767,D=s[_];if(x[J]=D,s[_]=J,z<=u){var T=o-u;if((A>7e3||S>24576)&&(T>423||!F)){i=Ar(r,t,0,I,U,O,h,S,q,u-q,i),S=A=h=0,q=u;for(var b=0;b<286;++b)U[b]=0;for(var b=0;b<30;++b)O[b]=0}var G=2,C=0,rr=M,Q=J-D&32767;if(T>2&&_==y(u-Q))for(var Z=Math.min(c,T)-1,K=Math.min(32767,u),N=Math.min(258,T);Q<=K&&--rr&&J!=D;){if(r[u+G]==r[u+G-Q]){for(var k=0;k<N&&r[u+k]==r[u+k-Q];++k);if(k>G){if(G=k,C=Q,k>Z)break;for(var X=Math.min(Q,k-2),m=0,b=0;b<X;++b){var p=u-Q+b&32767,ir=x[p],lr=p-ir&32767;lr>m&&(m=lr,D=p)}}}J=D,D=x[J],Q+=J-D&32767}if(C){I[S++]=268435456|Mr[G]<<18|zr[C];var ar=Mr[G]&31,nr=zr[C]&31;h+=or[ar]+ur[nr],++U[257+ar],++O[nr],z=u+G,++A}else I[S++]=r[u],++U[r[u]]}}for(u=Math.max(u,z);u<o;++u)I[S++]=r[u],++U[r[u]];i=Ar(r,t,F,I,U,O,h,S,q,u-q,i),F||(f.r=i&7|t[i/8|0]<<3,i-=7,f.h=s,f.p=x,f.i=u,f.w=z)}else{for(var u=f.w||0;u<o+F;u+=65535){var d=u+65535;d>=o&&(t[i/8|0]=F,d=o),i=qr(t,i+1,r.subarray(u,d))}f.i=o}return Ur(w,0,e+Fr(i)+v)},Ir=function(){var r=1,a=0;return{p:function(n){for(var e=r,v=a,f=n.length|0,o=0;o!=f;){for(var w=Math.min(o+2655,f);o<w;++o)v+=e+=n[o];e=(e&65535)+15*(e>>16),v=(v&65535)+15*(v>>16)}r=e,a=v},d:function(){return r%=65521,a%=65521,(r&255)<<24|(r&65280)<<8|(a&255)<<8|a>>8}}},Rr=function(r,a,n,e,v){if(!v&&(v={l:1},a.dictionary)){var f=a.dictionary.subarray(-32768),o=new B(f.length+r.length);o.set(f),o.set(r,f.length),r=o,v.w=f.length}return Qr(r,a.level==null?6:a.level,a.mem==null?v.l?Math.ceil(Math.max(8,Math.min(13,Math.log(r.length)))*1.5):20:12+a.mem,n,e,v)},Or=function(r,a,n){for(;n;++a)r[a]=n,n>>>=8},Vr=function(r,a){var n=a.level,e=n==0?0:n<6?1:n==9?3:2;if(r[0]=120,r[1]=e<<6|(a.dictionary&&32),r[1]|=31-(r[0]<<8|r[1])%31,a.dictionary){var v=Ir();v.p(a.dictionary),Or(r,2,v.d())}},Wr=function(r,a){return((r[0]&15)!=8||r[0]>>4>7||(r[0]<<8|r[1])%31)&&W(6,"invalid zlib data"),(r[1]>>5&1)==1&&W(6,"invalid zlib data: "+(r[1]&32?"need":"unexpected")+" dictionary"),(r[1]>>3&4)+2};function Zr(r,a){a||(a={});var n=Ir();n.p(r);var e=Rr(r,a,a.dictionary?6:2,4);return Vr(e,a),Or(e,e.length-4,n.d()),e}function $r(r,a){return Nr(r.subarray(Wr(r),-4),{i:2},a,a)}var Xr=typeof TextDecoder<"u"&&new TextDecoder,Yr=0;try{Xr.decode(Br,{stream:!0}),Yr=1}catch{}export{$r as u,Zr as z};

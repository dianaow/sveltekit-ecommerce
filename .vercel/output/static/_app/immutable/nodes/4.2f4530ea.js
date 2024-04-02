import{s as Jt,a as g,e as _,t as p,c as y,b as f,f as P,k as m,d as c,j as rt,l as E,i as D,m as t,o as Kt,n as nt,p as Wt,q as Qt}from"../chunks/scheduler.9d930ee3.js";import{S as Xt,i as Yt,c as Zt,a as te,m as ee,t as le,b as ae,d as se}from"../chunks/index.f2fb7d9e.js";import{e as Ut}from"../chunks/each.d75b621e.js";import{P as re}from"../chunks/public.415e40eb.js";import{S as ne}from"../chunks/SEO.faa1ff8c.js";import{f as ct}from"../chunks/utils.41ca3d8f.js";function Gt(a,e,s){const l=a.slice();return l[2]=e[s],l}function ie(a){let e,s="In Process";return{c(){e=_("p"),e.textContent=s},l(l){e=f(l,"P",{"data-svelte-h":!0}),rt(e)!=="svelte-13n4yq6"&&(e.textContent=s)},m(l,n){D(l,e,n)},p:nt,d(l){l&&c(e)}}}function oe(a){let e,s="Ready to Ship";return{c(){e=_("p"),e.textContent=s},l(l){e=f(l,"P",{"data-svelte-h":!0}),rt(e)!=="svelte-1rboenq"&&(e.textContent=s)},m(l,n){D(l,e,n)},p:nt,d(l){l&&c(e)}}}function ce(a){var I,d;let e,s,l=new Date((I=a[0].fulfillments[0])==null?void 0:I.shipped_at).toLocaleDateString("us-EN",{month:"long",day:"numeric",year:"numeric"})+"",n,h,i,o=((d=a[0].fulfillments[0].tracking_links[0])==null?void 0:d.tracking_number)&&ue(a);return{c(){e=_("p"),s=p("Shipped on "),n=p(l),h=g(),o&&o.c(),i=Qt()},l(v){e=f(v,"P",{});var k=P(e);s=m(k,"Shipped on "),n=m(k,l),k.forEach(c),h=y(v),o&&o.l(v),i=Qt()},m(v,k){D(v,e,k),t(e,s),t(e,n),D(v,h,k),o&&o.m(v,k),D(v,i,k)},p(v,k){var B;(B=v[0].fulfillments[0].tracking_links[0])!=null&&B.tracking_number&&o.p(v,k)},d(v){v&&(c(e),c(h),c(i)),o&&o.d(v)}}}function ue(a){var h;let e,s,l=((h=a[0].fulfillments[0].tracking_links[0])==null?void 0:h.tracking_number)+"",n;return{c(){e=_("p"),s=p("Tracking # "),n=p(l)},l(i){e=f(i,"P",{});var o=P(e);s=m(o,"Tracking # "),n=m(o,l),o.forEach(c)},m(i,o){D(i,e,o),t(e,s),t(e,n)},p:nt,d(i){i&&c(e)}}}function _e(a){let e=a[0].shipping_address.address_2+"",s,l;return{c(){s=p(e),l=_("br")},l(n){s=m(n,e),l=f(n,"BR",{})},m(n,h){D(n,s,h),D(n,l,h)},p:nt,d(n){n&&(c(s),c(l))}}}function fe(a){var h;let e,s,l=ct((h=a[0].payments[0])==null?void 0:h.amount_refunded)+"",n;return{c(){e=_("p"),s=p("Refunded: "),n=p(l)},l(i){e=f(i,"P",{});var o=P(e);s=m(o,"Refunded: "),n=m(o,l),o.forEach(c)},m(i,o){D(i,e,o),t(e,s),t(e,n)},p:nt,d(i){i&&c(e)}}}function zt(a){let e,s,l,n,h,i,o,I=a[2].title+"",d,v,k,B=a[2].description+"",M,q,w,N,b=ct(a[2].unit_price)+"",W,Q,H,X,Y=a[2].quantity+"",U,G;return{c(){e=_("li"),s=_("img"),n=g(),h=_("div"),i=_("div"),o=_("h3"),d=p(I),v=g(),k=_("p"),M=p(B),q=g(),w=_("p"),N=p("Price: "),W=p(b),Q=g(),H=_("p"),X=p("Quantity: "),U=p(Y),G=g(),this.h()},l(L){e=f(L,"LI",{class:!0});var O=P(e);s=f(O,"IMG",{src:!0,alt:!0,class:!0}),n=y(O),h=f(O,"DIV",{class:!0});var Z=P(h);i=f(Z,"DIV",{class:!0});var $=P(i);o=f($,"H3",{class:!0});var tt=P(o);d=m(tt,I),tt.forEach(c),v=y($),k=f($,"P",{class:!0});var it=P(k);M=m(it,B),it.forEach(c),q=y($),w=f($,"P",{class:!0});var z=P(w);N=m(z,"Price: "),W=m(z,b),z.forEach(c),Q=y($),H=f($,"P",{class:!0});var F=P(H);X=m(F,"Quantity: "),U=m(F,Y),F.forEach(c),$.forEach(c),Z.forEach(c),G=y(O),O.forEach(c),this.h()},h(){Wt(s.src,l=a[2].thumbnail)||E(s,"src",l),E(s,"alt","Product image"),E(s,"class","h-28 w-auto flex-none rounded-md bg-gray-200 object-cover object-center"),E(o,"class","text-gray-900"),E(k,"class","text-gray-900"),E(w,"class","text-gray-500"),E(H,"class","text-gray-500"),E(i,"class","space-y-1 text-sm font-medium"),E(h,"class","flex flex-col justify-between space-y-4 my-auto"),E(e,"class","flex space-x-6 py-3")},m(L,O){D(L,e,O),t(e,s),t(e,n),t(e,h),t(h,i),t(i,o),t(o,d),t(i,v),t(i,k),t(k,M),t(i,q),t(i,w),t(w,N),t(w,W),t(i,Q),t(i,H),t(H,X),t(H,U),t(e,G)},p:nt,d(L){L&&c(e)}}}function de(a){var At,Mt;let e,s,l,n,h=a[0].display_id+"",i,o,I,d,v,k="Status",B,M,q,w="Shipping Address",N,b,W=a[0].shipping_address.first_name+"",Q,H,X=a[0].shipping_address.last_name+"",Y,U,G,L=a[0].shipping_address.address_1+"",O,Z,$,tt,it=a[0].shipping_address.city+"",z,F,Ot=a[0].shipping_address.province+"",ft,dt,wt=a[0].shipping_address.postal_code+"",pt,mt,ht,J,Bt="Payment",vt,et,bt,Vt=ct(a[0].subtotal)+"",gt,yt,lt,kt,jt=ct(a[0].shipping_total)+"",xt,Et,at,Pt,Lt=ct((At=a[0].payments[0])==null?void 0:At.amount)+"",Ct,St,It,T,K,Tt="Items",Dt,A,ut;e=new ne({props:{title:"Order Details",description:"Details about your order from "+re}});function Ft(r,S){return r[0].fulfillment_status==="shipped"?ce:r[0].fulfillment_status==="filled"?oe:ie}let ot=Ft(a)(a),V=a[0].shipping_address.address_2&&_e(a),j=((Mt=a[0].payments[0])==null?void 0:Mt.amount_refunded)&&fe(a),st=Ut(a[0].items),C=[];for(let r=0;r<st.length;r+=1)C[r]=zt(Gt(a,st,r));return{c(){Zt(e.$$.fragment),s=g(),l=_("h1"),n=p("Order #"),i=p(h),o=g(),I=_("div"),d=_("div"),v=_("h2"),v.textContent=k,B=g(),ot.c(),M=g(),q=_("h2"),q.textContent=w,N=g(),b=_("p"),Q=p(W),H=g(),Y=p(X),U=_("br"),G=g(),O=p(L),Z=_("br"),$=g(),V&&V.c(),tt=g(),z=p(it),F=p(", "),ft=p(Ot),dt=g(),pt=p(wt),mt=_("br"),ht=g(),J=_("h2"),J.textContent=Bt,vt=g(),et=_("p"),bt=p("Order Subtotal: "),gt=p(Vt),yt=g(),lt=_("p"),kt=p("Shipping: "),xt=p(jt),Et=g(),at=_("p"),Pt=p("Payment: "),Ct=p(Lt),St=g(),j&&j.c(),It=g(),T=_("div"),K=_("h2"),K.textContent=Tt,Dt=g(),A=_("ul");for(let r=0;r<C.length;r+=1)C[r].c();this.h()},l(r){te(e.$$.fragment,r),s=y(r),l=f(r,"H1",{class:!0});var S=P(l);n=m(S,"Order #"),i=m(S,h),S.forEach(c),o=y(r),I=f(r,"DIV",{class:!0});var R=P(I);d=f(R,"DIV",{class:!0});var u=P(d);v=f(u,"H2",{class:!0,"data-svelte-h":!0}),rt(v)!=="svelte-1tylvad"&&(v.textContent=k),B=y(u),ot.l(u),M=y(u),q=f(u,"H2",{class:!0,"data-svelte-h":!0}),rt(q)!=="svelte-tmgm1t"&&(q.textContent=w),N=y(u),b=f(u,"P",{});var x=P(b);Q=m(x,W),H=y(x),Y=m(x,X),U=f(x,"BR",{}),G=y(x),O=m(x,L),Z=f(x,"BR",{}),$=y(x),V&&V.l(x),tt=y(x),z=m(x,it),F=m(x,", "),ft=m(x,Ot),dt=y(x),pt=m(x,wt),mt=f(x,"BR",{}),x.forEach(c),ht=y(u),J=f(u,"H2",{class:!0,"data-svelte-h":!0}),rt(J)!=="svelte-1xu508d"&&(J.textContent=Bt),vt=y(u),et=f(u,"P",{});var $t=P(et);bt=m($t,"Order Subtotal: "),gt=m($t,Vt),$t.forEach(c),yt=y(u),lt=f(u,"P",{});var Rt=P(lt);kt=m(Rt,"Shipping: "),xt=m(Rt,jt),Rt.forEach(c),Et=y(u),at=f(u,"P",{});var qt=P(at);Pt=m(qt,"Payment: "),Ct=m(qt,Lt),qt.forEach(c),St=y(u),j&&j.l(u),u.forEach(c),It=y(R),T=f(R,"DIV",{class:!0});var _t=P(T);K=f(_t,"H2",{class:!0,"data-svelte-h":!0}),rt(K)!=="svelte-cn7pi3"&&(K.textContent=Tt),Dt=y(_t),A=f(_t,"UL",{role:!0,class:!0});var Nt=P(A);for(let Ht=0;Ht<C.length;Ht+=1)C[Ht].l(Nt);Nt.forEach(c),_t.forEach(c),R.forEach(c),this.h()},h(){E(l,"class","text-2xl font-semibold my-5 sm:my-8 text-center"),E(v,"class","mt-6 mb-2 text-xl font-semibold text-gray-900"),E(q,"class","mt-6 mb-2 text-xl font-semibold text-gray-900"),E(J,"class","mt-6 mb-2 text-xl font-semibold text-gray-900"),E(d,"class","col-span-1"),E(K,"class","mt-6 mb-2 text-xl font-semibold text-gray-900"),E(A,"role","list"),E(A,"class","flex-auto"),E(T,"class","col-span-1"),E(I,"class","grid grid-cols-1 sm:grid-cols-2 max-w-screen-lg mx-auto")},m(r,S){ee(e,r,S),D(r,s,S),D(r,l,S),t(l,n),t(l,i),D(r,o,S),D(r,I,S),t(I,d),t(d,v),t(d,B),ot.m(d,null),t(d,M),t(d,q),t(d,N),t(d,b),t(b,Q),t(b,H),t(b,Y),t(b,U),t(b,G),t(b,O),t(b,Z),t(b,$),V&&V.m(b,null),t(b,tt),t(b,z),t(b,F),t(b,ft),t(b,dt),t(b,pt),t(b,mt),t(d,ht),t(d,J),t(d,vt),t(d,et),t(et,bt),t(et,gt),t(d,yt),t(d,lt),t(lt,kt),t(lt,xt),t(d,Et),t(d,at),t(at,Pt),t(at,Ct),t(d,St),j&&j.m(d,null),t(I,It),t(I,T),t(T,K),t(T,Dt),t(T,A);for(let R=0;R<C.length;R+=1)C[R]&&C[R].m(A,null);ut=!0},p(r,[S]){var R;if(ot.p(r,S),r[0].shipping_address.address_2&&V.p(r,S),(R=r[0].payments[0])!=null&&R.amount_refunded&&j.p(r,S),S&1){st=Ut(r[0].items);let u;for(u=0;u<st.length;u+=1){const x=Gt(r,st,u);C[u]?C[u].p(x,S):(C[u]=zt(x),C[u].c(),C[u].m(A,null))}for(;u<C.length;u+=1)C[u].d(1);C.length=st.length}},i(r){ut||(le(e.$$.fragment,r),ut=!0)},o(r){ae(e.$$.fragment,r),ut=!1},d(r){r&&(c(s),c(l),c(o),c(I)),se(e,r),ot.d(),V&&V.d(),j&&j.d(),Kt(C,r)}}}function pe(a,e,s){let{data:l}=e;const n=l.order;return a.$$set=h=>{"data"in h&&s(1,l=h.data)},[n,l]}class xe extends Xt{constructor(e){super(),Yt(this,e,pe,de,Jt,{data:1})}}export{xe as component};
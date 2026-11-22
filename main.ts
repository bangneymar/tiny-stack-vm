import{readdirSync as R,readFileSync as f,writeFileSync as w,mkdirSync as m}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
for(const d of R(I)){const[e,y]=run(f(I+"/"+d+"/program.bin"),f(I+"/"+d+"/input.bin"));m(O+"/"+d,{recursive:true});w(O+"/"+d+"/stdout.bin",y);w(O+"/"+d+"/exit.txt",e+"\n")}
function run(p,q){
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),y=new Uint8Array(65536);
let S=0,Q=0,P=0,K=0,J=0,L=0;
const T=e=>[e,y.slice(0,L)];
for(;;){
if(K==1e6)return T(10);
if(P<0||P>=p.length)return T(9);
const g=p[P];
if(!(g<8||g>15&&g<35&&g!=31||g>47&&g<53||g==64||g==65||g>79&&g<84))return T(5);
const i=g==1?1:g==2?4:g>47&&g<52?2:0;
if(P+i>=p.length)return T(9);
K++;const x=P+1+i;
const u=g==7?3:g==5||g==6||g==65||g>15&&g<35&&g!=23&&g!=27?2:g==3||g==4||g==23||g==27||g==49||g==50||g==64||g==80||g==81||g==83?1:0;
const v=g==6||g==7?3:g==4||g==5?2:g==1||g==2||g==82||g==64||g>15&&g<35&&g!=23&&g!=27?1:0;
if(S<u)return T(2);
if(S-u+v>256)return T(3);
P=x;
if(g==0)return T(0);
else if(g==1)D[S++]=(p[x-1]<<24)>>24;
else if(g==2)D[S++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;
else if(g==3)S--;
else if(g==4){D[S]=D[S-1];S++}
else if(g==5){const t=D[S-1];D[S-1]=D[S-2];D[S-2]=t}
else if(g==6){D[S]=D[S-2];S++}
else if(g==7){const t=D[S-3];D[S-3]=D[S-2];D[S-2]=D[S-1];D[S-1]=t}
else if(g==23)D[S-1]=-D[S-1]|0;
else if(g==27)D[S-1]=~D[S-1];
else if(g>15&&g<35){
const b=D[S-1],a=D[S-2];let r;
if(g==16)r=a+b|0;
else if(g==17)r=a-b|0;
else if(g==18)r=Math.imul(a,b);
else if(g==19){if(!b)return T(4);r=a==-2147483648&&b==-1?a:(a/b)|0}
else if(g==20){if(!b)return T(4);r=b==-1?0:a%b|0}
else if(g==21){if(!b)return T(4);r=(a>>>0)/(b>>>0)|0}
else if(g==22){if(!b)return T(4);r=(a>>>0)%(b>>>0)|0}
else if(g==24)r=a&b;
else if(g==25)r=a|b;
else if(g==26)r=a^b;
else if(g==28)r=a<<(b&31);
else if(g==29)r=a>>(b&31);
else if(g==30)r=a>>>(b&31)|0;
else if(g==32)r=a==b?1:0;
else if(g==33)r=a<b?1:0;
else r=(a>>>0)<(b>>>0)?1:0;
S-=2;D[S++]=r;
}else if(g>47&&g<51){
const r=(p[x-2]|p[x-1]<<8)<<16>>16,t=g==48?0:D[--S];
if(g==48||g==49&&t==0||g==50&&t!=0)P=x+r;
}else if(g==51){
if(Q==64)return T(7);
C[Q++]=x;P=p[x-2]|p[x-1]<<8;
}else if(g==52){
if(!Q)return T(8);
P=C[--Q];
}else if(g==64){
const a=D[S-1];
if(a<0||a>255)return T(6);
D[S-1]=M[a];
}else if(g==65){
const a=D[S-1];
if(a<0||a>255)return T(6);
S-=2;M[a]=D[S];
}else if(g==80){
const t=""+D[S-1];
if(L+t.length>65536)return T(11);
S--;for(let i=0;i<t.length;i++)y[L++]=t.charCodeAt(i);
}else if(g==81){
if(L>65535)return T(11);
y[L++]=D[--S]&255;
}else if(g==82)D[S++]=J<q.length?q[J++]:-1;
else return T(D[--S]&255);
}
}

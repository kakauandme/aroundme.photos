google.maps.__gjsload__('overlay', '\'use strict\';function TH(a){this.j=a}P(TH,T);Za(TH[I],function(a){"outProjection"!=a&&(a=!!(this.get("offset")&&this.get("projectionTopLeft")&&this.get("projection")&&ue(this.get("zoom"))),a==!this.get("outProjection")&&this.set("outProjection",a?this.j:null))});function UH(){}function VH(){var a=this.gm_props_;if(this[pq]()){if(this[Nc]()){if(!a.tg&&this.onAdd)this.onAdd();a.tg=!0;this.draw()}}else{if(a.tg)if(this[Yc])this[Yc]();else this[Jb]();a.tg=!1}}function WH(a){a.gm_props_=a.gm_props_||new UH;return a.gm_props_}function XH(a){Nm[kd](this);this.ma=R(a,VH)}P(XH,Nm);function YH(){}\nYH[I].j=function(a){var b=a[nq](),c=WH(a),d=c.Ec;c.Ec=b;d&&(c=WH(a),(d=c.Ga)&&d[Wp](),(d=c.Ai)&&d[Wp](),a[Wp](),a.set("panes",null),a.set("projection",null),Q(c.Z,S[Bb]),c.Z=null,c.yc&&(c.yc.ma(),c.yc=null),bx("Ox","-p",a));if(b){c=WH(a);d=c.yc;d||(d=c.yc=new XH(a));Q(c.Z,S[Bb]);var e=c.Ga=c.Ga||new jw,f=b[A];e[p]("zoom",f);e[p]("offset",f);e[p]("center",f,"projectionCenterQ");e[p]("projection",b);e[p]("projectionTopLeft",f);e=c.Ai=c.Ai||new TH(e);e[p]("zoom",f);e[p]("offset",f);e[p]("projection",b);\ne[p]("projectionTopLeft",f);a[p]("projection",e,"outProjection");a[p]("panes",f);e=R(d,d.Y);c.Z=[S[z](a,"panes_changed",e),S[z](f,"zoom_changed",e),S[z](f,"offset_changed",e),S[z](b,"projection_changed",e),S[z](f,"projectioncenterq_changed",e),S[u](b,"forceredraw",d)];d.Y();b instanceof Mg&&(Zw(b,"Ox"),ax("Ox","-p",a))}};var ZH=new YH;wh.overlay=function(a){eval(a)};ag("overlay",ZH);\n')
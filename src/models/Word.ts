//TODO: no hunglish. should refomat the data coming in and the props name
export interface Word {
  id?: string;
  olvasmany?: Reading;
  zsoltar: Psalm;
  szentlecke?: Reading;
  alleluia: Alleluia;
  evangelium: Gospel;
  konyorgesek: string;
}

export interface Reading {
  title: string;
  shortMessage: string;
  text: string;
  reference: string;
}

export interface Psalm {
  title: string;
  content: string;
}
export interface Gospel extends Reading {} //Just naming

export interface Alleluia {
  title: string;
  text: string;
}

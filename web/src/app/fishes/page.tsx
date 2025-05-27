import React from "react";

type Fish = {
  name: string;
  scientificName: string;
  habitat: string;
  image: string;
  description: string;
};

const fishes: Fish[] = [
  {
    name: "Crap",
    scientificName: "Cyprinus carpio",
    habitat: "Lacuri, râuri și iazuri din toată România",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Common_carp.jpg/330px-Common_carp.jpg",
    description:
      "Un pește de apă dulce foarte răspândit, apreciat atât pentru pescuit, cât și în bucătărie.",
  },
  {
    name: "Știucă",
    scientificName: "Esox lucius",
    habitat: "Râuri lente și lacuri, în special în Delta Dunării",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Esox_lucius1.jpg/330px-Esox_lucius1.jpg",
    description:
      "Pește răpitor cu corp lung și dinți ascuțiți, căutat de pescarii sportivi.",
  },
  {
    name: "Somn",
    scientificName: "Silurus glanis",
    habitat: "Râuri mari ca Dunărea și lacuri adânci",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.ieOKTsCDosibejwM99RalAHaEX%26cb%3Diwc2%26pid%3DApi&f=1&ipt=b94c11e01eacaa99ef8ec1de025289c5284146e3a1f243f7396555691df4e469&ipo=images",
    description:
      "Cel mai mare pește de apă dulce din Europa, poate depăși 2 metri lungime.",
  },
  {
    name: "Păstrăv",
    scientificName: "Salmo trutta",
    habitat: "Râuri reci de munte din Carpați",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Bachforelle_Zeichnung.jpg/330px-Bachforelle_Zeichnung.jpg",
    description:
      "Pește valoros din apele curate de munte, apreciat pentru gustul său delicat.",
  },
  {
    name: "Șalău",
    scientificName: "Sander lucioperca",
    habitat: "Lacuri mari, râuri adânci și canale din sudul și estul României",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Sander_lucioperca_Hungary.jpg/330px-Sander_lucioperca_Hungary.jpg",
    description:
      "Pește răpitor cu carne albă, fermă și gustoasă. Cunoscut pentru ochii mari și comportamentul de vânător nocturn, este foarte apreciat în bucătăria românească.",
  },
  {
    name: "Biban",
    scientificName: "Perca fluviatilis",
    habitat: "Lacuri, râuri și canale din toată România",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.MdgjK57XADjYc86RyN1d-AAAAA%26cb%3Diwc2%26pid%3DApi&f=1&ipt=7fb1f35dad68a342602cdd1b146ca8441a2fc0be1ec1bb5db888bec719bbad78&ipo=images",
    description:
      "Pește activ și agresiv, ușor de recunoscut după dungi verticale și înotătoarea dorsală cu țepi. Apreciat de pescarii sportivi pentru lupta pe care o oferă.",
  },
  {
    name: "Caras",
    scientificName: "Carassius gibelio",
    habitat: "Bălți, iazuri și lacuri cu apă stagnantă din toată România",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Carassius_gibelio_2008_G1.jpg/330px-Carassius_gibelio_2008_G1.jpg",
    description:
      "Pește rezistent, comun în pescuitul de agrement. Este ușor de prins și frecvent utilizat în preparate tradiționale precum prăjit sau la cuptor.",
  },
];

const FishPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">
        Pești din România
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {fishes.map((fish, idx) => (
          <div
            key={idx}
            className="bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={fish.image}
              alt={fish.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1 text-white">
                {fish.name}
              </h2>
              <p className="text-sm italic text-gray-400 mb-2">
                {fish.scientificName}
              </p>
              <p className="text-sm mb-2">
                <strong>Habitat:</strong> {fish.habitat}
              </p>
              <p className="text-sm text-gray-300">{fish.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FishPage;

import React from "react";

type Technique = {
  name: string;
  description: string;
  image: string;
};

const techniques: Technique[] = [
  {
    name: "Pescuit la plută",
    description:
      "Cea mai tradițională metodă de pescuit, ideală pentru apele stagnante sau liniștite. Se folosește o plută pentru a detecta mușcătura peștelui.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.XLLoVYbrwKPBWXV_QnyhmQHaEK%26pid%3DApi&f=1&ipt=b5f58f1afa663fb8d521c44f4d31d9f2e41a5a4a98505a6cd3e5c3a20d9d1c2d&ipo=images",
  },
  {
    name: "Pescuit la fund (la montură)",
    description:
      "Folosit pentru pești de talie mai mare, cum ar fi crapul. Nada se plasează pe fundul apei, iar mușcătura este sesizată prin vârful lansetei sau clopoțel.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.DlhaPZQ53Pc8VLtfIyeNtgHaEK%26cb%3Diwc2%26pid%3DApi&f=1&ipt=15b88a89f31b66db62919eb9150ea9eb4c8c4fff8ef796fc8fc3ab5e78aa4628&ipo=images",
  },
  {
    name: "Pescuit la muscă",
    description:
      "Tehnică specializată, folosită mai ales în râuri de munte pentru prinderea păstrăvului. Necesită echipament special și abilități de lansare a muștei artificiale.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fandyarif.ro%2Fwp-content%2Fuploads%2F2022%2F10%2Ffly_fishin_pescuit_la_musca_andy_arif_raul_arges_clean_pastrav_lipan.jpg&f=1&nofb=1&ipt=17b458b430368fce417afcec2c039141ac5bf46e4cdf2ace0f799c8958dbfd1d",
  },
];

const FishingTechniquesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">
        Tehnici de Pescuit
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {techniques.map((technique, idx) => (
          <div
            key={idx}
            className="bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={technique.image}
              alt={technique.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-white">
                {technique.name}
              </h2>
              <p className="text-sm text-gray-300">{technique.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FishingTechniquesPage;

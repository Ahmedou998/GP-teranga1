
import Link from "next/link";

import { ArrowLeft, ArrowRight, MapPin, ShieldCheck } from "lucide-react";

import { SiteHeader } from "@/components/site-header";

const sample = [

  {

    from: "Dakar",

    to: "Thiès",

    date: "Aujourd'hui · 16:30",

    price: "1 500",

    name: "Awa M.",

  },

  {

    from: "Dakar",

    to: "Saint-Louis",

    date: "Demain · 08:00",

    price: "2 000",

    name: "Moussa D.",

  },

  {

    from: "Thiès",

    to: "Mbour",

    date: "Demain · 10:15",

    price: "1 000",

    name: "Fatou N.",

  },

];

export default async function TripsPage({

  searchParams,

}: {

  searchParams: Promise<{

    origin?: string;

    destination?: string;

  }>;

}) {

  const params = await searchParams;

  const rows = sample.filter(

    (trip) =>

      (!params.origin ||

        trip.from.toLowerCase().includes(params.origin.toLowerCase())) &&

      (!params.destination ||

        trip.to.toLowerCase().includes(params.destination.toLowerCase()))

  );

  return (
<>
<SiteHeader />
<main className="container" style={{ padding: "54px 0 90px" }}>
<Link

          href="/"

          style={{

            display: "inline-flex",

            alignItems: "center",

            gap: 8,

            color: "#607168",

            fontSize: 13,

            fontWeight: 700,

          }}
>
<ArrowLeft size={15} />

          Accueil
</Link>
<div

          style={{

            marginTop: 25,

            display: "flex",

            justifyContent: "space-between",

            alignItems: "end",

            gap: 20,

            flexWrap: "wrap",

          }}
>
<div>
<div

              style={{

                color: "#087f5b",

                fontWeight: 800,

                fontSize: 12,

                letterSpacing: ".1em",

              }}
>

              TRAJETS
</div>
<h1 style={{ fontSize: 44, margin: "8px 0" }}>

              Des trajets à explorer.
</h1>
<p style={{ color: "#718078" }}>

              Exemples d'interface — annonces de démonstration, non réservables.
</p>
</div>
<Link className="btn btn-primary" href="/publier/trajet">

            Publier mon trajet <ArrowRight size={16} />
</Link>
</div>
<div

          style={{

            display: "grid",

            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",

            gap: 16,

            marginTop: 30,

          }}
>

          {rows.length > 0 ? (

            rows.map((trip) => (
<article

                className="surface"

                key={`${trip.from}-${trip.to}`}

                style={{ padding: 22 }}
>
<div

                  style={{

                    display: "flex",

                    justifyContent: "space-between",

                    fontSize: 11,

                    color: "#718078",

                  }}
>
<span>TRAJET EXEMPLE</span>
<span style={{ color: "#a06a23" }}>DÉMO</span>
</div>
<h2 style={{ fontSize: 22, margin: "18px 0 10px" }}>

                  {trip.from}{" "}
<span style={{ color: "#087f5b" }}>→</span>{" "}

                  {trip.to}
</h2>
<div

                  style={{

                    color: "#718078",

                    fontSize: 13,

                    display: "flex",

                    gap: 7,

                    alignItems: "center",

                  }}
>
<MapPin size={14} />

                  {trip.date}
</div>
<div

                  style={{

                    borderTop: "1px solid #edf0eb",

                    marginTop: 18,

                    paddingTop: 16,

                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center",

                  }}
>
<div>
<strong>{trip.name}</strong>
<div

                      style={{

                        fontSize: 11,

                        color: "#9a7b48",

                        marginTop: 4,

                      }}
>
<ShieldCheck

                        size={11}

                        style={{

                          display: "inline",

                          verticalAlign: "middle",

                        }}

                      />{" "}

                      Profil à vérifier
</div>
</div>
<strong>{trip.price} F/kg</strong>
</div>
</article>

            ))

          ) : (
<p>

              Aucun trajet de démonstration ne correspond à cette recherche.
</p>

          )}
</div>
</main>
<style>{`

        @media (max-width: 760px) {

          .container article {

            min-width: 0;

          }

        }

      `}</style>
</>

  );

}

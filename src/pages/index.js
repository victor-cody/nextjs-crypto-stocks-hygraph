import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";

import millify from "millify";

export default function Home({ cryptocurrencies }) {
  const currencies =
    cryptocurrencies?.cryptocurrencies[0]?.response?.data?.coins;

  return (
    <>
      <main className="main">
        <div className="container mx-auto px-2 lg:px-4">
          <table className=" mantine-1991q65 leading-relaxed w-[100%]">
            <thead className="mb-4 pb-4">
              <tr className="text-xl">
                <th>Name</th>
                <th>Rank</th>
                <th>Price</th>
                <th>Daily Change</th>
                <th>Market Cap</th>
                <th>Volume(24h)</th>
              </tr>
            </thead>
            <tbody className="">
              {currencies.map((crypto) => {
                return (
                  <tr
                    className="cursor-pointer border-t-2  border-[#e5e7eb] w-full hover:bg-gray-100 text-[1rem] font-semibold"
                    key={crypto.uuid}
                  >
                    <td className="h-full flex items-center gap-5">
                      <div className=" w-[20%] mantine-Avatar-root mantine-1azaf4t">
                        <Image
                          width={50}
                          height={50}
                          className="mantine-1trwvlz mantine-Avatar-image"
                          src={crypto.iconUrl}
                          alt={`${crypto.name}'s logo`}
                        />
                      </div>
                      <span>{crypto.name}</span>
                    </td>
                    <td>
                      {" "}
                      <span className="text-blue-700 py-[2px] px-[4px] bg-blue-100">
                        #{crypto.rank}
                      </span>
                    </td>
                    <td>
                      $
                      {millify(crypto.price, {
                        precision: 3,
                        lowercase: true,
                      })}
                    </td>
                    <td
                      className={`font-bold ${
                        crypto.change.includes("-")
                          ? "text-red-700"
                          : "text-green-700"
                      }`}
                    >
                      {crypto.change}%
                    </td>
                    <td>${millify(crypto.marketCap, { precision: 3 })}</td>
                    <td>{millify(crypto.listedAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.HYGRAPH_URL}`,
    cache: new InMemoryCache(),
    headers: { authorization: `Bearer ${process.env.API_TOKEN}` },
  });

  const data = await client.query({
    query: gql`
      query CryptoStocksQuery {
        cryptocurrencies {
          response {
            data {
              coins {
                uuid
                name
                symbol
                marketCap
                rank
                price
                change
                color
                iconUrl
                listedAt
              }
            }
          }
        }
      }
    `,
  });

  const cryptocurrencies = data.data;

  return {
    props: {
      cryptocurrencies,
    },
  };
}

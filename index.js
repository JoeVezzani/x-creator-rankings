const API_KEY = process.env.LUNARCRUSH_API_KEY;

async function getCreator(network, username) {
  const res = await fetch(
    `https://lunarcrush.com/api4/public/creator/${network}/${username}/v1`,
    { headers: { Authorization: `Bearer ${API_KEY}` } }
  );
  return res.json();
}

async function main() {
  const username = process.argv[2] || "PopBase";
  const creator = await getCreator("twitter", username);

  console.log(`\n${creator.data?.display_name} (@${creator.data?.screen_name})`);
  console.log(`Followers: ${creator.data?.followers_count?.toLocaleString()}`);
  console.log(`Engagements (24h): ${creator.data?.interactions?.toLocaleString()}`);
  console.log(`CreatorRank: ${creator.data?.creator_rank}`);
  console.log(`Posts tracked: ${creator.data?.num_posts}`);
}

main();

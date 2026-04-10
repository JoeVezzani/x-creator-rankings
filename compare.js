const API_KEY = process.env.LUNARCRUSH_API_KEY;

async function getCreator(network, username) {
  const res = await fetch(
    `https://lunarcrush.com/api4/public/creator/${network}/${username}/v1`,
    { headers: { Authorization: `Bearer ${API_KEY}` } }
  );
  return res.json();
}

async function compareCreators(usernames) {
  const results = [];
  for (const username of usernames) {
    const data = await getCreator("twitter", username);
    results.push({
      name: data.data?.display_name || username,
      username,
      followers: data.data?.followers_count || 0,
      engagements: data.data?.interactions || 0,
      rank: data.data?.creator_rank || 0,
    });
  }
  results.sort((a, b) => b.engagements - a.engagements);
  console.log(`\nCreator Comparison:\n`);
  for (const r of results) {
    const ratio = r.followers > 0 ? (r.engagements / r.followers).toFixed(1) : "N/A";
    console.log(`  @${r.username.padEnd(20)} ${r.engagements.toLocaleString().padStart(15)} eng | ${r.followers.toLocaleString().padStart(12)} followers | ratio: ${ratio}x | rank: #${r.rank}`);
  }
}

const defaults = ["PopBase", "Cristiano", "FabrizioRomano", "Rainmaker1973", "Polymarket", "NASA"];
const usernames = process.argv.length > 2 ? process.argv.slice(2) : defaults;
compareCreators(usernames);

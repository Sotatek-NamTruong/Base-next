import { get } from "lodash";
import { type NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const collectionAddress = searchParams.get("collectionAddress");
  const tokenId = searchParams.get("tokenId");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/nfts/getUrl/${collectionAddress}/${tokenId}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const raw = await res.json();
  const metadata = get(raw, "data.metadata", null);
  if (metadata) {
    return Response.redirect(metadata);
  }
  return Response.json({ message: "Metadata not found!" });
}

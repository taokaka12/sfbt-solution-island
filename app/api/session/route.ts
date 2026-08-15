import {sql} from "drizzle-orm";
import {getDb} from "../../../db";
import {usageSessions} from "../../../db/schema";
import {getChatGPTUser} from "../../chatgpt-auth";

const sessionPattern=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(req:Request){
  const user=await getChatGPTUser();
  if(!user)return Response.json({error:"Unauthorized"},{status:401});
  let body:unknown;
  try{body=await req.json()}catch{return Response.json({error:"Invalid JSON"},{status:400})}
  const candidate=body&&typeof body==="object"?body as Record<string,unknown>:{};
  const sessionId=typeof candidate.sessionId==="string"?candidate.sessionId:"";
  const activeSeconds=Math.max(0,Math.min(86400,Math.floor(Number(candidate.activeSeconds)||0)));
  if(!sessionPattern.test(sessionId))return Response.json({error:"Invalid session"},{status:400});
  const now=new Date().toISOString(),db=getDb();
  await db.insert(usageSessions).values({sessionId,userId:user.userId,email:user.email,displayName:user.displayName,loginAt:now,lastSeenAt:now,activeSeconds}).onConflictDoUpdate({target:usageSessions.sessionId,set:{email:user.email,displayName:user.displayName,lastSeenAt:now,activeSeconds:sql`max(${usageSessions.activeSeconds}, ${activeSeconds})`}});
  return Response.json({ok:true});
}


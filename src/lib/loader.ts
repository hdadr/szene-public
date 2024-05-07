import { countItemsIndexDB, openDatabase, storeItemsIndexDB } from "@/lib/indexDB";

export async function loadItems<T>(store: string, fileName: string) {
  const db = await openDatabase();
  const count = (await countItemsIndexDB(db, store)) as number;

  const alreadyStored = count > 0;
  if (alreadyStored) {
    return;
  }

  try {
    const items: T[] = await fetch("/" + fileName).then((res) => res.json());
    await storeItemsIndexDB<T>(db, store, items);
  } catch (error) {
    console.error(error);
  }
}

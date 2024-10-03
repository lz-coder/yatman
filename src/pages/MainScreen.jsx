import TileManager from "../components/TileManager";

export default function MainScreen() {
  const tilesStorage = [];

  return <TileManager tilesStorage={tilesStorage} />;
}

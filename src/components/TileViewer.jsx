import Modal from "./Modal";
import TileManager from "./TileManager";

export default function TileViewer({ tile, closeCallback }) {
  return (
    <Modal title={tile.name} closeHandler={closeCallback}>
      <TileManager tilesStorage={tile.items} onGroup={true} />
    </Modal>
  );
}

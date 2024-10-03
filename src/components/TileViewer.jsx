import GroupModel from "../models/group";
import Modal from "./Modal";
import Tile from "./Tile";

export default function TileViewer({ tile, closeCallback }) {
  return (
    <Modal title={tile.name} closeHandler={closeCallback}>
      <div className="w-full max-w-7xl">
        {tile instanceof GroupModel &&
          tile.items.map((item) => {
            return <Tile key={item.id} data={item} onGroup={true} />;
          })}
      </div>
    </Modal>
  );
}

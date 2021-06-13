from pygltflib import GLTF2

filename = "./level4.glb"
gltf = GLTF2().load(filename)

# print(meshes)

reference = ""

for node in gltf.nodes:
    t = node.translation
    reference += f"new THREE.Vector3({t[0]}, {t[1]}, {t[2]}) \n"


print(reference)
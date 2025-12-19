import bpy
import math

# --- CÁC HÀM CƠ BẢN (GIỮ NGUYÊN) ---
def clean_scene():
    if bpy.context.active_object and bpy.context.active_object.mode == 'EDIT':
        bpy.ops.object.mode_set(mode='OBJECT')
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()

def create_material(name, hex_color, emission=0):
    if name in bpy.data.materials: return bpy.data.materials[name]
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    bsdf = nodes.get("Principled BSDF")
    r, g, b = int(hex_color[0:2], 16)/255.0, int(hex_color[2:4], 16)/255.0, int(hex_color[4:6], 16)/255.0
    bsdf.inputs['Base Color'].default_value = (r, g, b, 1)
    bsdf.inputs['Roughness'].default_value = 0.8
    if emission > 0:
        bsdf.inputs['Emission Color'].default_value, bsdf.inputs['Emission Strength'].default_value = (r,g,b,1), emission
    return mat

def create_cube_data(location, scale, rotation=(0,0,0), material=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location, rotation=rotation)
    obj = bpy.context.active_object
    obj.scale = scale
    if material: obj.data.materials.append(material)
    return obj

def create_cube_modifier(location, scale, name="Cube", material=None):
    obj = create_cube_data(location, scale, material=material)
    obj.name = name
    bpy.ops.object.modifier_add(type='BEVEL')
    obj.modifiers["Bevel"].width = 0.05
    return obj

def add_bevel(obj, width=0.02):
    """Hàm phụ trợ thêm bevel nhanh cho object"""
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_add(type='BEVEL')
    obj.modifiers["Bevel"].width = width
    obj.modifiers["Bevel"].segments = 2

# --- HÀM TẠO BÀN GHẾ MASTER (GIỮ NGUYÊN) ---
def create_master_workstation(mats):
    mat_wood, mat_dark, mat_screen, mat_chair = mats
    desk_parts, chair_parts = [], []
    # Bàn & Màn hình
    desk_main = create_cube_data((0, 0, 0.75), (2.2, 1.0, 0.08), material=mat_wood)
    desk_parts.append(desk_main)
    for lx, ly in [(-1.0, -0.4), (-1.0, 0.4), (1.0, -0.4), (1.0, 0.4)]:
        desk_parts.append(create_cube_data((lx, ly, 0.375), (0.08, 0.08, 0.75), material=mat_dark))
    monitor_y, monitor_z = 0.2, 0.75 + 0.04 + 0.3
    desk_parts.append(create_cube_data((-0.5, monitor_y, monitor_z), (0.8, 0.05, 0.5), rotation=(0,0,math.radians(10)), material=mat_dark))
    desk_parts.append(create_cube_data((-0.48, monitor_y-0.03, monitor_z), (0.76, 0.01, 0.46), rotation=(0,0,math.radians(10)), material=mat_screen))
    desk_parts.append(create_cube_data((-0.5, monitor_y+0.1, 0.9), (0.1, 0.1, 0.3), material=mat_dark))
    desk_parts.append(create_cube_data((0.5, monitor_y, monitor_z), (0.8, 0.05, 0.5), rotation=(0,0,math.radians(-10)), material=mat_dark))
    desk_parts.append(create_cube_data((0.48, monitor_y-0.03, monitor_z), (0.76, 0.01, 0.46), rotation=(0,0,math.radians(-10)), material=mat_screen))
    desk_parts.append(create_cube_data((0.5, monitor_y+0.1, 0.9), (0.1, 0.1, 0.3), material=mat_dark))
    # Ghế
    chair_parts.append(create_cube_data((0, -0.8, 0.25), (0.1, 0.1, 0.5), material=mat_dark))
    chair_parts.append(create_cube_data((0, -0.8, 0.1), (0.6, 0.08, 0.08), rotation=(0,0,math.radians(45)), material=mat_dark))
    chair_parts.append(create_cube_data((0, -0.8, 0.1), (0.6, 0.08, 0.08), rotation=(0,0,math.radians(-45)), material=mat_dark))
    chair_parts.append(create_cube_data((0, -0.8, 0.55), (0.6, 0.6, 0.1), material=mat_chair))
    chair_parts.append(create_cube_data((0, -0.55, 0.85), (0.5, 0.1, 0.6), rotation=(math.radians(-10),0,0), material=mat_chair))
    # Join Ghế & Xoay
    bpy.ops.object.select_all(action='DESELECT')
    for p in chair_parts: p.select_set(True)
    bpy.context.view_layer.objects.active = chair_parts[0]
    bpy.ops.object.join()
    temp_chair = bpy.context.active_object
    temp_chair.rotation_euler[2] = math.radians(180) 
    # Join Tổng
    bpy.ops.object.select_all(action='DESELECT')
    temp_chair.select_set(True)
    for p in desk_parts: p.select_set(True)
    bpy.context.view_layer.objects.active = desk_main
    bpy.ops.object.join()
    master_obj = bpy.context.active_object
    master_obj.name = "Master_Workstation"
    add_bevel(master_obj)
    return master_obj

# --- HÀM TẠO TƯỜNG (GIỮ NGUYÊN) ---
def create_room_walls(cx, cy, size_x, size_y, height, thickness, material):
    half_x, half_y = size_x / 2, size_y / 2
    create_cube_modifier((cx, cy+half_y+thickness/2, height/2), (size_x+thickness*2, thickness, height), "Wall_Back", material)
    create_cube_modifier((cx-half_x-thickness/2, cy, height/2), (thickness, size_y, height), "Wall_Left", material)
    create_cube_modifier((cx+half_x+thickness/2, cy, 0.25), (thickness, size_y, 0.5), "Wall_Right_Low", material)
    create_cube_modifier((cx, cy-half_y-thickness/2, 0.25), (size_x+thickness*2, thickness, 0.5), "Wall_Front_Low", material)

# --- HÀM MỚI: TẠO CỬA ĐÔI (2 CÁNH RIÊNG BIỆT) ---
def create_double_door_assembly(materials):
    """Tạo cửa đôi, 2 cánh là object riêng, parent vào khung."""
    mat_frame, mat_panel, mat_handle = materials
    
    # Thông số kích thước
    total_w, door_h = 2.0, 2.5 # Tổng chiều rộng và chiều cao
    frame_thick, panel_thick = 0.2, 0.08
    gap = 0.01 # Khe hở giữa 2 cánh
    panel_w = (total_w / 2) - gap # Chiều rộng 1 cánh

    # 1. TẠO KHUNG CỬA (FRAME) - Sẽ là Parent Object
    bpy.ops.object.select_all(action='DESELECT')
    frame = create_cube_data((0, 0, door_h/2), (total_w + frame_thick*2, frame_thick, door_h + frame_thick), material=mat_frame)
    frame.name = "Door_Frame_Parent"
    add_bevel(frame, width=0.03)

    # 2. TẠO CÁNH TRÁI (Panel L + Handle L)
    bpy.ops.object.select_all(action='DESELECT')
    # Vị trí X: dịch sang trái một nửa chiều rộng cánh + nửa khe hở
    pos_x_l = -(panel_w/2 + gap/2)
    panel_l = create_cube_data((pos_x_l, -0.05, door_h/2), (panel_w, panel_thick, door_h), material=mat_panel)
    # Tay nắm trái: nằm ở mép phải của cánh trái
    handle_l = create_cube_data((-gap/2 - 0.08, -0.12, 1.0), (0.04, 0.08, 0.15), material=mat_handle)
    
    # Join cánh trái và tay nắm trái
    panel_l.select_set(True)
    handle_l.select_set(True)
    bpy.context.view_layer.objects.active = panel_l
    bpy.ops.object.join()
    door_l_obj = bpy.context.active_object
    door_l_obj.name = "Doorpanel_L"
    add_bevel(door_l_obj, width=0.02) # Bevel riêng cho cánh

    # 3. TẠO CÁNH PHẢI (Panel R + Handle R)
    bpy.ops.object.select_all(action='DESELECT')
    # Vị trí X: dịch sang phải đối xứng
    pos_x_r = (panel_w/2 + gap/2)
    panel_r = create_cube_data((pos_x_r, -0.05, door_h/2), (panel_w, panel_thick, door_h), material=mat_panel)
    # Tay nắm phải: nằm ở mép trái của cánh phải
    handle_r = create_cube_data((gap/2 + 0.08, -0.12, 1.0), (0.04, 0.08, 0.15), material=mat_handle)
    
    # Join cánh phải và tay nắm phải
    panel_r.select_set(True)
    handle_r.select_set(True)
    bpy.context.view_layer.objects.active = panel_r
    bpy.ops.object.join()
    door_r_obj = bpy.context.active_object
    door_r_obj.name = "Doorpanel_R"
    add_bevel(door_r_obj, width=0.02) # Bevel riêng cho cánh

    # 4. THIẾT LẬP PARENT (Khung là Cha, 2 Cánh là Con)
    bpy.ops.object.select_all(action='DESELECT')
    door_l_obj.select_set(True) # Chọn con 1
    door_r_obj.select_set(True) # Chọn con 2
    frame.select_set(True)      # Chọn cha cuối cùng
    bpy.context.view_layer.objects.active = frame # Set cha là active
    # Lệnh Parent (Keep Transform để giữ nguyên vị trí)
    bpy.ops.object.parent_set(type='OBJECT', keep_transform=True)
    
    # Trả về object Khung (Parent) để dễ di chuyển cả cụm
    return frame

# --- MAIN EXECUTION ---
clean_scene()

# 1. VẬT LIỆU
mats_desk = (create_material("Wood", "D4A373"), create_material("DarkMetal", "333333"), create_material("Screen", "61A5C2", emission=2.0), create_material("ChairFabric", "E63946"))
mat_floor, mat_wall = create_material("Floor", "E9EDC9"), create_material("WallPaint", "F1FAEE")
mats_door = (create_material("DoorFrame", "2F3E46"), create_material("DoorPanel", "CAD2C5"), create_material("DoorHandle", "D4A373"))

# 2. BỐ TRÍ BÀN GHẾ
master_ws = create_master_workstation(mats_desk)
master_ws.hide_render, master_ws.location = True, (0, 0, -20)
grid = [
    (0,0),(0,1),    (0,3),(0,4),(0,5),(0,6),(0,7),
    (2,0),(2,1),
                    (3,3),(3,4),(3,5),(3,6),(3,7),
                    (4,3),(4,4),(4,5),(4,6),(4,7),
                    (5,3),(5,4),(5,5),(5,6),(5,7),
                    (6,5),(6,6),(6,7)]
SX, SY, cx, cy = 2.4, -2.5, 0, 0
for r, c in grid:
    bpy.ops.object.select_all(action='DESELECT')
    master_ws.select_set(True)
    bpy.context.view_layer.objects.active = master_ws
    bpy.ops.object.duplicate(linked=True)
    bpy.context.active_object.location = (c*SX, r*SY, 0)
    cx += c*SX; cy += r*SY
if grid: cx /= len(grid); cy /= len(grid)

# 3. MÔI TRƯỜNG
FX, FY = 30, 25
create_cube_modifier((cx, cy, -1), (FX, FY, 0.1), "Floor", mat_floor)
create_room_walls(cx, cy, FX, FY, 4.0, 0.5, mat_wall)

# --- 4. TẠO VÀ ĐẶT CỬA ĐÔI (RIÊNG CÁNH) ---
# Hàm này trả về object Khung cửa (Parent)
door_assembly_parent = create_double_door_assembly(mats_door)

# Di chuyển object Parent (cả bộ sẽ đi theo)
door_pos_x = cx - 6.0
door_pos_y = cy + FY/2
door_pos_z = 0
door_assembly_parent.location = (door_pos_x, door_pos_y, door_pos_z)

# CAMERA & LIGHT
bpy.ops.object.camera_add(location=(cx+28, cy-28, 28))
cam = bpy.context.active_object
cam.data.type, cam.data.ortho_scale, cam.rotation_euler = 'ORTHO', 30, (math.radians(54.7), 0, math.radians(45))
bpy.context.scene.camera = cam
bpy.ops.object.light_add(type='SUN', location=(10, -10, 20), rotation=(math.radians(45), 0, math.radians(45))).data.energy = 5
bpy.ops.object.light_add(type='AREA', location=(cx-5, cy-5, 15)).data.energy, bpy.context.active_object.data.size = 250, 30

print("Xong! Cửa đôi 2 cánh riêng biệt (Parented vào khung).")
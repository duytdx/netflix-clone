

export const ImagePreview = ({ image, name }) => {
    return (
        <div className="">
            <img src={image ? image : "/images/user.png"} alt={name} className="w-full h-full object-cover rounded" />
        </div>
    )
}
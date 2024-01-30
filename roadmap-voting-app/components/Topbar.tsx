

const Topbar = () => {
    return (
        <div className=" bg-cusSec w-full border border-cusBorder px-8 py-4 text-white rounded-tr-lg rounded-tl-lg flex items-center justify-between">
            <div className="flex items-center gap-8 ">
                <div className=" border-b-4 border-b-cusBorder">
                    All
                </div>
                <div>
                    Need feedback
                </div>
                <div>
                    Next
                </div>
                <div>
                    In Progress
                </div>
                <div>
                    Completed
                </div>
            </div>
            <div>
                Most voted
            </div>
        </div>
    )
}

export default Topbar

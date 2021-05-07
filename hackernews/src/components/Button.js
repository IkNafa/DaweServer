const Button = ({onClick, className='', children}) => {
    return (
        <button className="button-inline"
                onClick={onClick}
                className={className}
                type="button"
        >{children}</button>
    )
}

export default Button;
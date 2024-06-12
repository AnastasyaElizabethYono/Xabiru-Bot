import re
def str_to_bool(s):
    """Converts a string to a boolean."""
    return s.lower() in ["true", "1", "t", "y", "yes"]

def list_to_str(str_list, delimiter="\n"):
    final_str = ""
    for str in str_list:
        final_str += str + delimiter

    return final_str


def format_to_rupiah(value):
    return "Rp {:,.0f}".format(value)


def to_camel_case(snake_str):
    # Split the string by underscores or whitespace
    parts = re.split(r"[_\s]+", snake_str)
    # Capitalize the first letter of each part except the first one
    camel_case_str = " ".join(word.capitalize() for word in parts)
    return camel_case_str

